module.exports = {
  testEnvironment: 'node',
  noStackTrace: true,
  transform: {
    '^.+\\.((j|t)sx?)$': 'babel-jest'
  },
  setupFilesAfterEnv: ['./test/setup.js']
};
