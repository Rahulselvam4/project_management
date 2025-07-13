
/** @type {import('next').NextConfig} */
const nextConfig = {
  // no need for experimental.appDir
   eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;