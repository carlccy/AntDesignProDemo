module.exports = {
  testURL: 'http://localhost:8000',
  testEnvironment: './tests/PuppeteerEnvironment',
  verbose: false,
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: false,
    localStorage: null,
  },
  setupFiles: ['<rootDir>/test.setup.js', '<rootDir>/test.shim.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@mock/(.*)$': '<rootDir>/mock/$1',
  },
};
