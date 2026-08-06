import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export estático: a Wiki é 100% SSG e não depende de runtime de servidor.
  // Nada consulta Figma ou Storybook em produção — todo dado extraído é estático.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ['ts', 'tsx', 'mdx'],
  reactStrictMode: true,
};

export default createMDX({})(nextConfig);
