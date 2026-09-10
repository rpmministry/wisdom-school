// La clave de Google TTS vive SOLO en el servidor (GOOGLE_TTS_API_KEY).
// El cliente pide el audio a /api/tts; si el servidor no tiene clave, cae a la voz del navegador.
let serverTTSDisabled = false;

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
  if (serverTTSDisabled) return null;
  const cleanText = opts.text.replace(/[*_#`~]/g, '').slice(0, 5000);
  try {
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: cleanText, teacherName: opts.teacherName }),
    });
    if (!response.ok) {
      // 503 = servidor sin clave TTS; 404 = endpoint no disponible. No reintentar en esta sesión.
      if (response.status === 503 || response.status === 404) serverTTSDisabled = true;
      return null;
    }
    const data = await response.json();
    if (data?.audioContent) {
      return 'data:audio/mp3;base64,' + data.audioContent;
    }
    return null;
  } catch {
    return null;
  }
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