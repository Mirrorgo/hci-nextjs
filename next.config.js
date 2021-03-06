/** @type {import('next').NextConfig} */
const { getThemeVariables } = require("antd/dist/theme");

const nextConfig = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/workbench",
        destination: "/workbench/home",
        permanent: true,
      },
    ];
  },
  rules: [
    {
      test: /\.less$/,
      use: [
        {
          loader: "style-loader",
        },
        {
          loader: "css-loader", // translates CSS into CommonJS
        },
        {
          loader: "less-loader", // compiles Less to CSS
          options: {
            lessOptions: {
              // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
              modifyVars: getThemeVariables({
                dark: true, // 开启暗黑模式
                // compact: true, // 开启紧凑模式
              }),
              javascriptEnabled: true,
            },
          },
        },
      ],
    },
  ],
};

// webpack.config.js
// module.exports = {

// };
module.exports = nextConfig;
