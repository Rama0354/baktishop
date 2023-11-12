/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  images: {
    // loader: 'custom',
    // loaderFile: './my-loader.ts',
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bkw-s3.s3-ap-southeast-1.amazonaws.com",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
