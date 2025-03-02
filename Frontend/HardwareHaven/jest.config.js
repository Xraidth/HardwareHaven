module.exports = {
  displayName: 'mi-sitio-web',
  preset: 'jest-preset-angular',
  maxWorkers: 3,
  bail: true,
  roots: ['<rootDir>/src/'],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  setupFilesAfterEnv: ['<rootDir>/src/test.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage/mi-sitio-web',
  coverageReporters: ['text-summary', 'lcov'],
  globals:{
    'ts-jest':{
      tsconfig: '<rootDir>/tsconfig.spec.json'
    }
  },
};



