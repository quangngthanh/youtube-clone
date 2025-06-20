import { API_BASE_URL, API_ENDPOINTS } from "@/lib/api/end-points";
import { createSupabaseServerClient } from "@/lib/auth/supabase-server";
import type { VideoResponse } from "@/types/video";

/**
 * Fetches a list of related videos from the server.
 * @param tags - An array of tags to find related videos.
 * @param currentVideoId - The ID of the current video to exclude from the results.
 * @param limit - The maximum number of videos to return.
 * @returns A promise that resolves to an array of video responses or null.
 */
export async function getRelatedVideos(
    tags: string[] | undefined, 
    currentVideoId: string,
    limit: number = 7
): Promise<VideoResponse[] | null> {
    if (!tags || tags.length === 0) {
        return []; // Return empty if no tags are provided
    }

    const supabase = await createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    const headers: HeadersInit = {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const query = tags.join(',');
    const url = `${API_BASE_URL}${API_ENDPOINTS.video.list}?q=${query}&page=1&limit=${limit}`;

    try {
        const res = await fetch(url, {
            headers,
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!res.ok) {
            console.error(`Error fetching related videos: ${res.statusText}`);
            return null;
        }

        const data = await res.json();
        
        // Assume API returns { data: VideoResponse[] }
        const allVideos = data.data as VideoResponse[];

        // Filter out the current video and respect the limit
        return allVideos
            .filter((v: VideoResponse) => v.id.toString() !== currentVideoId)
            .slice(0, limit - 1);

    } catch (error) {
        console.error(`Failed to fetch related videos:`, error);
        return null;
    }
} 