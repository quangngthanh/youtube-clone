'use client';
import { PATH } from "@/lib/constants/paths";
import { getFullPath } from "@/lib/utils/get-full-path";
import type { VideoResponse } from "@/types/video";
import Image from "next/image";
import Link from "next/link";

export function RelatedVideoItem({ video }: { video: VideoResponse }) {
    return (
        <Link href={PATH.VIDEO_DETAIL(video.id) || ''} className="flex gap-2 items-center mb-3 hover:bg-accent rounded p-1 transition">
            <div className="relative w-[80px] h-[45px] flex-shrink-0 rounded overflow-hidden relative aspect-[16/9]">
                <Image
                    src={getFullPath(video.image) || ''}
                    alt={video.title}
                    fill
                    className="object-cover rounded"
                    loading="lazy"
                />
            </div>
            <div className="text-sm font-medium line-clamp-2 text-foreground">
                {video.title}
            </div>
        </Link>
    );
}