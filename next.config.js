/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  compiler: {
    styledComponents: true,
  },
  // images: {
  //   domains: ["api.vamedi.net"],
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "api.vamedi.net",
  //       port: "",
  //       pathname: "/api/v1/file/view/**",
  //     },
  //   ],
  // },
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
