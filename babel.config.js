module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          browsers: ['last 2 versions', 'safari >= 7', 'IE >= 9'],
        },
      },
    ],
    '@babel/preset-typescript',
  ],
};
