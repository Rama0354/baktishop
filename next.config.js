/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // loader: 'custom',
    // loaderFile: './my-loader.ts',
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bakti-shop.s3-ap-southeast-1.amazonaws.com",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
