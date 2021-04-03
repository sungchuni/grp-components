module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  verbose: true,
};
