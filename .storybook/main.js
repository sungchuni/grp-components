module.exports = {
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  webpackFinal(config) {
    const { rules } = config.module;
    rules.push({
      test: /\.s?css$/,
      use: [
        'vue-style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[local]_[hash:base64:8]',
            },
          },
        },
        'sass-loader',
      ],
    });
    return config;
  },
};
