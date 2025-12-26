const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require('remark-gfm')],
    rehypePlugins: [
      require('rehype-slug'),
      [require('rehype-autolink-headings'), { behavior: 'wrap' }],
      [
        require('rehype-pretty-code'),
        {
          theme: 'one-dark-pro', // Tema de código. Pode ser 'github-dark', 'nord', etc.
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` with empty lines
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push('line--highlighted');
          },
          onVisitHighlightedWord(node) {
            node.properties.className.push('word--highlighted');
          },
        },
      ],
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    domains: ['avatars.githubusercontent.com'], // Permite imagens do GitHub
  },
  experimental: {
    appDir: true, // Habilita o App Router
  },
};

module.exports = withMDX(nextConfig);