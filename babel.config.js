module.exports = {
  presets: [
    ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }],
    '@babel/preset-react',
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
