module.exports = {
  displayName: 'mi-sitio-web',
  preset: 'jest-preset-angular',
  maxWorkers: 3,
  bail: true,
  roots: ['<rootDir>/src/'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  setupFilesAfterEnv: ['<rootDir>/src/test.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage/mi-sitio-web',
  coverageReporters: ['text-summary', 'lcov'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json', // Archivo tsconfig para pruebas
        stringifyContentPathRegex: '\\.(html|css)$', // Ignora archivos .html y .css
      },
    ],
  },
  moduleNameMapper: {
    '^.+\\.html$': '<rootDir>/src/__mocks__/empty-mock.ts', // Mock para archivos .html
    '^.+\\.css$': '<rootDir>/src/__mocks__/empty-mock.ts', // Mock para archivos .css
    '^@app/(.*)$': '<rootDir>/src/app/$1', // Mapeo para rutas absolutas (si las usas)
    '^@core/(.*)$': '<rootDir>/src/core/$1', // Mapeo para rutas absolutas (si las usas)
  },
};
