/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    PRIVATE_KEY: process.env.PRIVATE_KEY,
  },
};
