module.exports = {
    preset: 'ts-jest',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
    },
    testRegex: '.*\.integration\.spec\.ts'
};