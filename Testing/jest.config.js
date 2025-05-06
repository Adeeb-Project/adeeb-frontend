module.exports = {
  setupFilesAfterEnv: [
    '<rootDir>/__mocks__/setupMocks.js',
    '<rootDir>/setupTests.js'
  ],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^components/(.*)$': '<rootDir>/__mocks__/components/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js'
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  testMatch: [
    "<rootDir>/Testing/**/*.test.js",
    "<rootDir>/Testing/**/*.test.jsx"
  ],
  moduleDirectories: ['node_modules', 'src', '__mocks__'],
  testPathIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: [
    '/node_modules/(?!(@chakra-ui|@emotion)/)'
  ]
};
