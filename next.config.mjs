/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Cloudflare Pages “静态导出”最稳配置
  output: "export",
  trailingSlash: true,

  // ✅ 静态站点不能走 next/image 优化
  images: { unoptimized: true },

  // ✅ 避免 Cloudflare 上某些情况下的路径/路由怪问题
  reactStrictMode: true,

  // 如果你有用到 ESLint/TS 严格检查导致构建中断，可以先放开：
  // eslint: { ignoreDuringBuilds: true },
  // typescript: { ignoreBuildErrors: true },
};

export default nextConfig;