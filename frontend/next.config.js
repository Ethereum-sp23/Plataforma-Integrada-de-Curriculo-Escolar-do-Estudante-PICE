/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["ipfs.io"],
        loader: "default",
        path: "/_next/image",
        disableStaticImages: true,
        minimumCacheTTL: 60,
    },
    async rewrites() {
        return [
            {
                source: "/ipfs/:path*",
                destination: "https://ipfs.io/:path*",
            },
        ];
    },
    async headers() {
        return [
            {
                source: "/ipfs/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
