/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["latin"] } },
    ],
  },
  modularizeImports: {
    "@react-icons": {
      transform: "@react-icons/{{member}}",
    },
  },
};

module.exports = nextConfig;
