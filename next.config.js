/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'assets.aceternity.com', 
      'images.unsplash.com',
      'firebasestorage.googleapis.com',
      'storage.googleapis.com'
    ]
  }
};

export default nextConfig;
