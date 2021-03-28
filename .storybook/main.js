module.exports = {
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  webpackFinal(config) {
    const { rules } = config.module;
    rules.push({
      test: /\.s?css$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    });
    return config;
  },
};
