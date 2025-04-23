import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ['joyye.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'nufxwuons8neb8sd.public.blob.vercel-storage.com',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
