'use client';
import Image from 'next/image';
import Link from 'next/link';
import type { VideoResponse } from '@/types/video';
import { PATH } from '@/lib/constants/paths';
import { getFullPath } from '@/lib/utils/get-full-path';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getInitialsFromName } from '@/lib/utils/utils';
import { useUserStore } from '@/lib/stores/user-store';

export default function VideoCard({ video }: { video: VideoResponse }) {
    const { user } = useUserStore();
    return (
        <div className="bg-card">
            <figure className="relative w-full rounded-xl overflow-hidden mb-2 relative aspect-[16/9]">
                <Link href={PATH.VIDEO_DETAIL(video.id) || ''} className="w-full h-full">
                    <Image
                        src={getFullPath(video.image) || ''}
                        alt={video.title}
                        width={550}
                        height={309}
                        className="object-cover w-full h-full"
                        loading="lazy"
                    />
                </Link>
            </figure>
            <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={getFullPath(user?.avatar || '') || ''} alt={user?.fullname || ''} />
                  <AvatarFallback>{getInitialsFromName(user?.fullname || '')}</AvatarFallback>
                </Avatar>
                <div>
                    <div className="text-lg font-semibold text-foreground">
                        <Link href={PATH.VIDEO_DETAIL(video.id) || ''}>
                            {video.title}
                        </Link>
                    </div>
                    <div className="text-sm text-muted-foreground">{video.author || ''}</div>
                    <div className="text-sm text-muted-foreground">{video.views?.toLocaleString() || ''} lượt xem • {video.createdAt || ''}</div>
                </div>
            </div>
        </div>
    );
}