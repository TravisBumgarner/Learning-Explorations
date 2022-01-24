const baseJestConfig = require('./jest.base')

module.exports = {
    ...baseJestConfig,
    testMatch: ["**/*integration.spec.ts"]
};