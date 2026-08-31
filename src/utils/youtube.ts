/**
 * Helper to ensure any YouTube URL (watch, share, short, embed, search) is converted to a clean embed URL
 */
export function formatYouTubeEmbedUrl(url?: string): string | undefined {
  if (!url) return undefined;
  
  // Clean trimmed url
  const cleanUrl = url.trim();

  // If it is a search results URL, convert to embed search list
  if (cleanUrl.includes('search_query=') || cleanUrl.includes('listType=search')) {
    const match = cleanUrl.match(/search_query=([^&]+)/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed?listType=search&list=${match[1]}&rel=0&modestbranding=1`;
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
    return `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1`;
  }
  
  return cleanUrl;
}

/**
 * Helper to get a direct YouTube watch URL for opening in a new tab
 */
export function getYouTubeWatchUrl(url?: string, fallbackQuery?: string): string {
  if (!url && fallbackQuery) {
    return getYouTubeSearchUrl(fallbackQuery);
  }
  if (!url) return 'https://www.youtube.com';

  if (url.includes('search_query=')) {
    return url;
  }

  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regExp);
  
  if (match && match[1]) {
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
