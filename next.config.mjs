/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {

                protocol: 'https',
                hostname: '*googleusercontent.com'

            },
            {
                protocol : 'https',
                hostname : 'easy-order-s.s3.amazonaws.com'
            },
        ]

    }
        eslint:{

            ignoreDuringBuilds : true
        },
        typescript: {
            // !! WARN !!
            // Dangerously allow production builds to successfully complete even if
            // your project has type errors.
            // !! WARN !!
            ignoreBuildErrors: true,
        },
};

export default nextConfig;
