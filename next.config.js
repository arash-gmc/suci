/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      include: path.resolve(__dirname, "assets"), // Component SVGs
      use: ["@svgr/webpack"],
    });
    // Fallback: all other SVGs as files
    config.module.rules.push({
      test: /\.svg$/,
      type: "asset/resource", // Static SVGs (e.g. animation)
      exclude: path.resolve(__dirname, "assets"),
    });
    return config;
  },
};

module.exports = nextConfig;
