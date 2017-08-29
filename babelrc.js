module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        roont: '.',
        alias: {
          shared: './shared',
          'header-components': './header-components',
        },
      },
    ],
    [
      'wrap-in-js',
      {
        extensions: ['css$', 'scss$'],
      },
    ],
    [
      'inline-react-svg', {
        svgo: {
          plugins: [
            {
              cleanupIDs: false,
            },
          ],
        },
      },
    ],
    [
      'styled-components',
      {
        ssr: true,
        displayName: true,
        preprocess: false,
      },
    ],
  ],
  presets: ['env', 'stage-0', 'react'],
  comments: false,
  ignore: [],
}
