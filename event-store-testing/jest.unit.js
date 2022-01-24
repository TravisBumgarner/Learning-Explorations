module.exports = {
    preset: 'ts-jest',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
    },
    // testRegex: '^.*\.unit\.spec\.ts$',
    testMatch: ["**/*unit.spec.ts"]
};