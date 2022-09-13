module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
    ],
    overrides: [
        {
            files: ['./src/db/migration/**'],
            rules: {
                'class-methods-use-this': ['off'],
                'max-len': ['off'],
            }
        },
        {
            files: ['./src/db/entity/**'],
            rules: {
                indent: ['off'],
            }
        }
    ],
    rules: {
        semi: ['error', 'never'],
        'import/extensions': ['off'],
        'max-len': ['warn', { code: 150 }],
        indent: ['error', 4, { SwitchCase: 1 }],
        'import/prefer-default-export': ['off'],
        'import/no-unresolved': ['off'],
        'comma-dangle': ['off'],
        'jsx-a11y/media-has-caption': ['off'],
        'no-unused-vars': 'off', // ts does it better
        '@typescript-eslint/no-unused-vars': 'error', // ts does it better
        'no-shadow': 'off', // ts does it better
        '@typescript-eslint/no-shadow': ['error'], // ts does it better
        'consistent-return': ['off'],
        'no-undef': ['off'], // ts does it better
        'default-case': ['off'], // ts does it better
        'no-spaced-func': ['off'],
        'func-call-spacing': ['off'],
        'object-curly-newline': ['off'],
        'arrow-body-style': ['off']
    },
}