/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(mp4)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        publicPath: '/_next/static/videos/',
                        outputPath: 'static/videos/',
                        name: '[name].[hash].[ext]',
                    },
                },
            ],
        });

        return config;
    },

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.ibb.co',
                port: '',
            },
        ],
        unoptimized: true,
    },
};

export default nextConfig;
