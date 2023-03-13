// /** @type {import('next').NextConfig} */

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
      {
        protocol: "http",
        hostname: "localhost",
        port: "3030",
        pathname: "/images/**",
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
