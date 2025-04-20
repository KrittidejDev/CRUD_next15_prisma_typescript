import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blush-objective-bear-429.mypinata.cloud", // ✅ host ที่คุณใช้
        pathname: "/ipfs/**", // ✅ รูปแบบ path ของ IPFS
      },
    ],
  },
};

export default nextConfig;
