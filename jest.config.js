module.exports = {
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}
