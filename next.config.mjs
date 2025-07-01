/** @type {import('next').NextConfig} */

// GitHub Pages의 경우 저장소 이름을 basePath로 사용
const isGithubActions = process.env.GITHUB_ACTIONS || false;
const repoName =
  process.env.GITHUB_REPOSITORY?.split("/")[1] || "jq-playground";

const nextConfig = {
  output: "export",
  basePath: isGithubActions ? `/${repoName}` : "",
  assetPrefix: isGithubActions ? `/${repoName}/` : "",
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
