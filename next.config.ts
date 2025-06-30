import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    trailingSlash: false,
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
            {
                protocol: 'https',
                hostname: 'i.ytimg.com',
            },
            {
                protocol: 'https',
                hostname: 'i.pravatar.cc',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'admin.codelungtung.click',
            },
            {
                protocol: 'https',
                hostname: 'localhost',
            },
        ],
    }
};

export default nextConfig;
