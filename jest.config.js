module.exports = {
  coverageDirectory: './coverage',
  collectCoverageFrom: ['src/**/*.ts', 'src/**/*.tsx'],
  testEnvironment: 'node',
  modulePaths: ['<rootDir>/src', 'node_modules'],
  roots: ['<rootDir>/src/', '<rootDir>/test/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.[tj]sx?$',
  
  coverageReporters: ['json', 'lcov', 'text'],
  coveragePathIgnorePatterns: ['.*/src/.*\\.d\\.ts', '.*/src/testUtil/.*'],
  testResultsProcessor: 'jest-sonar-reporter'

  // // Use the below to set coverate goals
  // coverageThreshold: {
  //   global: {
  //     statements: 80,
  //     branches: 80,
  //     functions: 80,
  //     lines: 80
  //   }
  // }
};