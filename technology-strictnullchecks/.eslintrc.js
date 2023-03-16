module.exports = {
    env: {
        es2021: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: "./tsconfig.strictNullChecks.json"
    },
    plugins: [
        "strict-null-checks",
    ],
    rules: {
        "strict-null-checks/all": "warn",
        semi: ['error', 'never'],
    },
    ignorePatterns: ['.eslintrc.js']
}