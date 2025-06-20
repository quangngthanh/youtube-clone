// types/video.ts


export type VideoResponse = {
    id: number;
    title: string;
    image: string;
    views: number;
    createdAt: string;
    author: string;
    avatar: string;
    tags?: string[];
    view: number;
};

export type Comment = {
    id: string;
    content: string;
    user_name: string;
    user_avatar?: string;
    created_at: string;
};

export type VideoDetail = VideoResponse & {
    views: number;
    description: string;
    path: string;
    isActive: boolean;
    related_videos: VideoResponse[];
}; 