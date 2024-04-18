/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: false,
//   images: {
//     domains: ["www.gravatar.com"],
//   },
// };

// module.exports = nextConfig;

// next.config.js
const withTM = require('next-transpile-modules')(['@cyntler/react-doc-viewer']); // Add the package name here

module.exports = withTM({
  // Your Next.js config
  reactStrictMode: false,
    images: {
      domains: ["www.gravatar.com"],
    },
});
