import { injectable } from 'inversify';
import youtubedl from 'youtube-dl-exec';

// Define an interface for the relevant parts of the yt-dlp JSON output for Bilibili
export interface YtDlpBilibiliInfo {
  id: string;
  title: string;
  uploader: string; // Use as artist
  duration: number; // Length in seconds
  webpage_url: string; // Use as URL
  thumbnail: string; // Thumbnail URL
  is_live?: boolean; // Check if it's a live stream
}

@injectable()
export default class BilibiliAPI {
  constructor() {
    // Dependencies can be injected here if needed later (e.g., cache)
  }

  /**
   * Fetches video information from Bilibili using yt-dlp.
   * @param url The Bilibili video URL.
   * @returns A promise resolving to the video information.
   */
  async getVideoInfo(url: string): Promise<YtDlpBilibiliInfo> {
    try {
      const videoInfo = await youtubedl(url, {
        dumpSingleJson: true, // Corresponds to -j
        skipDownload: true,   // Corresponds to -s (though dumpSingleJson often implies this)
        // Add any other necessary yt-dlp flags here
      });

      // Type assertion might be needed depending on youtube-dl-exec's typings
      return videoInfo as YtDlpBilibiliInfo;
    } catch (error) {
      console.error(`Error fetching Bilibili video info for ${url}:`, error);
      throw new Error(`Failed to get Bilibili video info: ${String(error)}`);
    }
  }
} 