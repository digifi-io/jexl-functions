module.exports = {
  verbose: true,
  testRegex: '^((?!Router).)*\\.test.ts$', // matches any file that ends with test.ts and does not contain word "Router"
  roots: [
    '<rootDir>',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testEnvironment: 'node',
};
