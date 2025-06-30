import { RelatedVideoItem } from "./RelatedVideoItem";
import type { VideoResponse } from "@/types/video";

export default function RelatedVideoList({ videos }: { videos: VideoResponse[] }) {
    return (
        <div className="flex flex-col">
            {videos?.map((video) => (
                <RelatedVideoItem key={video.id} video={video} />
            ))}
        </div>
    );
}
