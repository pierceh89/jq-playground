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
  webpack: (config) => {
    config.experiments = {
      ...(config.experiments || {}),
      asyncWebAssembly: true,
    };

    // jq-web 패키지에 대한 특별한 처리
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    // jq-web WASM 파일 복사
    config.module.rules.push({
      test: /\.wasm$/,
      type: "asset/resource",
    });

    return config;
  },
};

export default nextConfig;
