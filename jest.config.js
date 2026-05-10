/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  transform: {
    '^.+\.tsx?$': ['ts-jest', {
      // ts-jest configuration options
      // e.g., tsconfig: 'tsconfig.test.json',
    }],
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  moduleNameMapper: {
    // Handle module aliases if necessary, e.g., '@/(.*)': '<rootDir>/src/$1'
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // You might need to configure globals for Next.js specifics if needed
  // globals: {
  //   'ts-jest': {
  //     tsconfig: 'tsconfig.json', // Or a specific tsconfig for tests
  //   },
  // },
};
