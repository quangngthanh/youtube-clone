import Image from 'next/image';
import Link from 'next/link';
import type { VideoResponse } from '@/types/video';
import { PATH } from '@/lib/constants/paths';
import { getFullPath } from '@/lib/utils/get-full-path';

export function RelatedVideoItemOnPlayer({ video }: { video: VideoResponse }) {
    return (
        <Link href={PATH.VIDEO_DETAIL(video.id) || ''} className="cursor-pointer transform hover:scale-105 transition">
                <Image
                    src={getFullPath(video.image) || ''}
                    alt={video.title}
                    width={150}
                    height={100}
                    className="w-full rounded-lg shadow-md"
                    loading="lazy"
                />
                <p className="mt-2 text-center text-sm">{video.title}</p>
        </Link>
    );
}