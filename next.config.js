/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.sanity.io', // ✅ Allow Sanity images
      'lh3.googleusercontent.com', // (optional) Google OAuth profile pics
      'avatars.githubusercontent.com' // (optional) GitHub profile pics
    ],
  },
};

module.exports = nextConfig;
