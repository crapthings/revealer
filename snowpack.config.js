module.exports = {
  mount: {
    src: { url: '/' },
  },
  buildOptions: {
    out: './app',
    baseUrl: './',
    jsxInject: `import React from 'react'`,
  },
  devOptions: {
    tailwindConfig: './tailwind.config.js',
  },
  plugins: [
    // '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-postcss',
  ],
}
