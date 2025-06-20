import type { VideoDetail } from '@/types/video';
import { API_ENDPOINTS, API_BASE_URL } from '@/lib/api/end-points';
import { createSupabaseServerClient } from '@/lib/auth/supabase-server';

export async function getVideoDetail(id: string): Promise<VideoDetail | null> {
    const videoId = parseInt(id, 10);
    if (isNaN(videoId)) {
        console.warn('❌ Invalid video ID:', id);
        return null;
    }

    // ✅ Bổ sung logic lấy token xác thực
    const supabase = await createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    const headers: HeadersInit = {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        // ✅ Sử dụng fetch gốc với Next.js caching và header xác thực
        const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.video.detail(id)}`, {
            headers, // Thêm header vào request
            next: { revalidate: 60 } // Cache trong 60 giây
        });

        if (!res.ok) {
            console.error(`Error fetching video ${id}: ${res.statusText}`);
            return null;
        }

        const data = await res.json();

        return data.data as VideoDetail;

    } catch (error) {
        console.error(`Failed to fetch video detail for id ${id}:`, error);
        return null;
    }
}