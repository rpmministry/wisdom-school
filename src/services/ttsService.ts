const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_TTS_API_KEY || '';
const isGoogleTTSAvailable = !!GOOGLE_API_KEY;

export interface TTSOptions {
  messageId: string;
  text: string;
  teacherName: string;
  onEnd?: () => void;
  onPause?: () => void;
  onPlay?: () => void;
}

interface TTSService {
  isSpeaking: boolean;
  speakingId: string | null;
  isPaused: boolean;
  audioCache: Record<string, string>;
  play: (opts: TTSOptions) => Promise<void>;
  pause: () => void;
  stop: () => void;
  toggle: (opts: TTSOptions) => Promise<void>;
  resume: () => void;
  clearCache: () => void;
}

const FEMALE_FIRST_NAMES = [
  'sofia', 'sarah', 'valentina', 'carla', 'clara', 'lucia', 'maya',
  'emma', 'pincelita', 'mariana', 'camila', 'valeria', 'paula', 'maria',
];

const isTeacherFemale = (teacherName: string): boolean => {
  if (!teacherName) return false;
  const lower = teacherName.toLowerCase().trim();
  const parts = lower.replace(/[.,]/g, '').split(/\s+/);
  if (parts.some((p) => FEMALE_FIRST_NAMES.includes(p))) return true;
  if (lower.includes('dra.') || lower.includes('maestra') || lower.includes('profesora') ||
      lower.includes('miss') || lower.includes('tía ') || lower.includes('tia ') ||
      lower.includes('mba')) return true;
  return false;
};

const synthesizeWithBrowser = (opts: TTSOptions): void => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(opts.text);
  utterance.lang = 'es-EC';
  utterance.rate = 1.0;
  utterance.onend = () => { if (opts.onEnd) opts.onEnd(); };
  utterance.onerror = () => { if (opts.onEnd) opts.onEnd(); };
  window.speechSynthesis.speak(utterance);
};

const fetchGoogleAudio = async (opts: TTSOptions): Promise<string | null> => {
  if (!isGoogleTTSAvailable) return null;
  const isFemale = isTeacherFemale(opts.teacherName);
  const voiceName = isFemale ? 'es-US-Neural2-A' : 'es-US-Neural2-B';
  const cleanText = opts.text.replace(/[*_#`~]/g, '').substring(0, 5000);
  const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      input: { text: cleanText },
      voice: { languageCode: 'es-US', name: voiceName },
      audioConfig: { audioEncoding: 'MP3', speakingRate: 1.05, pitch: isFemale ? 1.0 : -2.0 },
    }),
  });
  const data = await response.json();
  if (data.audioContent) {
    return 'data:audio/mp3;base64,' + data.audioContent;
  }
  return null;
};

const playWithGoogle = async (opts: TTSOptions): Promise<void> => {
  const audioUrl = opts.messageId in googleTTSState.audioCache
    ? googleTTSState.audioCache[opts.messageId]
    : await fetchGoogleAudio(opts);

  if (!audioUrl) {
    synthesizeWithBrowser(opts);
    return;
  }

  if (!(opts.messageId in googleTTSState.audioCache)) {
    googleTTSState.audioCache = { ...googleTTSState.audioCache, [opts.messageId]: audioUrl };
  }

  const audio = new Audio(audioUrl);
  googleTTSState.currentAudio = audio;
  googleTTSState.speakingId = opts.messageId;
  googleTTSState.isPaused = false;
  audio.onended = () => {
    googleTTSState.isSpeaking = false;
    googleTTSState.speakingId = null;
    googleTTSState.isPaused = false;
    if (opts.onEnd) opts.onEnd();
  };
  audio.onpause = () => {
    if (opts.onPause) opts.onPause();
  };
  audio.onplay = () => {
    googleTTSState.isPaused = false;
    if (opts.onPlay) opts.onPlay();
  };
  try {
    await audio.play();
  } catch {
    synthesizeWithBrowser(opts);
  }
};

const googleTTSState: {
  isSpeaking: boolean;
  speakingId: string | null;
  isPaused: boolean;
  audioCache: Record<string, string>;
  currentAudio: HTMLAudioElement | null;
} = {
  isSpeaking: false,
  speakingId: null,
  isPaused: false,
  audioCache: {},
  currentAudio: null,
};

export const ttsService: TTSService = {
  get isSpeaking() { return googleTTSState.isSpeaking; },
  get speakingId() { return googleTTSState.speakingId; },
  get isPaused() { return googleTTSState.isPaused; },
  get audioCache() { return googleTTSState.audioCache; },

  async play(opts: TTSOptions): Promise<void> {
    googleTTSState.isSpeaking = true;
    if (googleTTSState.currentAudio) {
      googleTTSState.currentAudio.pause();
      googleTTSState.currentAudio.currentTime = 0;
    }
    googleTTSState.isPaused = false;
    await playWithGoogle(opts);
  },

  pause(): void {
    if (googleTTSState.currentAudio) {
      googleTTSState.currentAudio.pause();
      googleTTSState.isPaused = true;
    }
  },

  stop(): void {
    if (googleTTSState.currentAudio) {
      googleTTSState.currentAudio.pause();
      googleTTSState.currentAudio.currentTime = 0;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    googleTTSState.isSpeaking = false;
    googleTTSState.speakingId = null;
    googleTTSState.isPaused = false;
  },

  async toggle(opts: TTSOptions): Promise<void> {
    if (opts.messageId === googleTTSState.speakingId && !googleTTSState.isPaused && googleTTSState.isSpeaking) {
      this.pause();
    } else if (opts.messageId === googleTTSState.speakingId && googleTTSState.isPaused) {
      this.resume();
    } else {
      await this.play(opts);
    }
  },

  resume(): void {
    if (googleTTSState.currentAudio) {
      googleTTSState.currentAudio.play();
      googleTTSState.isPaused = false;
    }
  },

  clearCache(): void {
    googleTTSState.audioCache = {};
  },
};