import type { Metadata } from 'next';
import VideoClient from './VideoClient';
import { getVideoDetail } from '@/features/videos/get-video-detail';
import CommentSection from './CommentSection';
import RelatedVideoList from '@/components/video/RelatedVideoList';
import { getRelatedVideos } from '@/features/videos/get-related-videos';

type Props = {
    params: Promise<{ id: string }>;
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const video = await getVideoDetail(id);

    if (!video || 'error' in video) {
        return {
            title: 'Video không tồn tại',
            description: 'Video bạn tìm kiếm không tồn tại hoặc đã bị xóa.',
            openGraph: {
                images: ['/default-thumbnail.jpg'], // fallback image
            },
        };
    }

    return {
        title: video.title + ' - ' + video.author,
        description: video.description?.slice(0, 160) || 'Xem video chi tiết',
        openGraph: {
            images: [video.image],
        },
    };
}

export default async function Page({ params }: Props) {
    const { id } = await params;

    const video = await getVideoDetail(id);
    console.log(video);
    const isValid = video && !('error' in video);

    const relatedVideosResult = isValid ? await getRelatedVideos(video.tags, id) : null;
    const relatedVideos = relatedVideosResult || [];

    return (
        <div className="w-full flex flex-col md:flex-row gap-8 max-w-6xl mx-auto mt-10 px-2">
            <div className="flex-1 min-w-0">
                <VideoClient id={id} video={isValid ? video : null} relatedVideos={relatedVideos.slice(0, 4)} />
                {isValid && <CommentSection videoId={id} />}
            </div>
            <aside className="w-full md:w-[320px] flex-shrink-0">
                <div className="font-semibold text-lg mb-3">Video liên quan</div>
                <RelatedVideoList videos={relatedVideos.slice(0, 6)} />
            </aside>
        </div>
    )
}