/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["latin"] } },
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "marketplace.canva.com",
        port: "",
      },
    ],
  },
  modularizeImports: {
    "@react-icons": {
      transform: "@react-icons/{{member}}",
    },
  },
};

module.exports = nextConfig;
