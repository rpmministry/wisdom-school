/**
 * Helper to ensure any YouTube URL (watch, share, short, embed, search) is converted to a clean embed URL
 * Detects and replaces placeholder Rick Roll video ID (dQw4w9WgXcQ) with educational search results
 */
const PLACEHOLDER_VIDEO_ID = 'dQw4w9WgXcQ';

function isPlaceholderUrl(url?: string): boolean {
  if (!url) return true;
  return url.includes(PLACEHOLDER_VIDEO_ID) || url === 'https://www.youtube.com/embed/' || url === 'https://www.youtube.com';
}

function buildSpanishSearchEmbed(query: string): string {
  const encoded = encodeURIComponent(query.trim() + ' español educación');
  return `https://www.youtube.com/embed?listType=search&list=${encoded}&rel=0&modestbranding=1&hl=es`;
}

export function formatYouTubeEmbedUrl(url?: string, fallbackQuery?: string): string | undefined {
  if (!url || isPlaceholderUrl(url)) {
    if (fallbackQuery) return buildSpanishSearchEmbed(fallbackQuery);
    return buildSpanishSearchEmbed('educación clase explicación');
  }
  
  // Clean trimmed url
  const cleanUrl = url.trim();

  // If it is a search results URL, convert to embed search list
  if (cleanUrl.includes('search_query=') || cleanUrl.includes('listType=search')) {
    const match = cleanUrl.match(/search_query=([^&]+)/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed?listType=search&list=${match[1]}&rel=0&modestbranding=1&hl=es`;
    }
    return cleanUrl;
  }

  // If it already has embed with query params or standard embed
  if (cleanUrl.includes('youtube.com/embed/')) {
    // Ensure it doesn't have broken double protocol
    return cleanUrl;
  }
  
  // Regular expressions to extract standard 11-character YouTube video ID
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = cleanUrl.match(regExp);
  
  if (match && match[1]) {
    if (match[1] === PLACEHOLDER_VIDEO_ID && fallbackQuery) {
      return buildSpanishSearchEmbed(fallbackQuery);
    }
    return `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1&hl=es`;
  }
  
  if (fallbackQuery) return buildSpanishSearchEmbed(fallbackQuery);
  return cleanUrl;
}

/**
 * Helper to get a direct YouTube watch URL for opening in a new tab
 * Redirects placeholder Rick Roll URL to educational search
 */
export function getYouTubeWatchUrl(url?: string, fallbackQuery?: string): string {
  if (!url || isPlaceholderUrl(url)) {
    if (fallbackQuery) return getYouTubeSearchUrl(fallbackQuery);
    return 'https://www.youtube.com/results?search_query=educaci%C3%B3n+espa%C3%B1ol';
  }
  if (!url) return 'https://www.youtube.com';

  if (url.includes('search_query=')) {
    return url;
  }

  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regExp);
  
  if (match && match[1]) {
    if (match[1] === PLACEHOLDER_VIDEO_ID && fallbackQuery) {
      return getYouTubeSearchUrl(fallbackQuery);
    }
    return `https://www.youtube.com/watch?v=${match[1]}`;
  }

  if (fallbackQuery) {
    return getYouTubeSearchUrl(fallbackQuery);
  }

  return url;
}

/**
 * Helper to get an official YouTube search URL for educational keywords
 */
export function getYouTubeSearchUrl(query: string): string {
  const encoded = encodeURIComponent(query.trim());
  return `https://www.youtube.com/results?search_query=${encoded}`;
}
