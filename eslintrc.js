module.exports = {
    root: true,
    env: {
        es2021: true,
        node: true,
        mocha: true,
        jest: true,
        browser: true,
    },
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    plugins: ['proposal', 'import'],
    globals: {
        sinon: true,
        expect: true,
        spyOn: true,
    },

    ignorePatterns: ['dist/**', '**/__snapshots__/**', 'coverage/**'],
    extends: ['eslint:recommended'],
    overrides: [
        {
            files: ['**/*.js', '**/*.jsx'],
            rules: {
                indent: ['error', 4],
                'object-curly-spacing': ['error', 'always'],
                'array-bracket-spacing': ['error', 'never'],
                'computed-property-spacing': ['error', 'never'],
                'comma-spacing': ['error', { before: false, after: true }],
                'space-infix-ops': 'error',
                'keyword-spacing': 'error',

                semi: ['error', 'always'],
                'comma-dangle': [
                    'error',
                    {
                        arrays: 'always-multiline',
                        objects: 'always-multiline',
                        imports: 'always-multiline',
                        exports: 'always-multiline',
                        functions: 'never',
                    },
                ],
                'no-unreachable-loop': 'error',
                'no-case-declarations': 'error',
                quotes: ['error', 'single', { avoidEscape: true }],
                'quote-props': ['error', 'as-needed'],

                'no-console': 'error',
                'no-loss-of-precision': 'error',
                'no-template-curly-in-string': 'error',
                'no-unsafe-optional-chaining': 'error',
                'no-useless-backreference': 'error',
                'no-caller': 'error',
                'no-constructor-return': 'error',
                'no-implicit-globals': 'error',
                'no-confusing-arrow': 'error',
                'no-useless-escape': 'error',
                'prefer-const': 'error',
                'max-len': [
                    'error',
                    {
                        code: 220,
                        ignoreComments: true,
                        ignoreRegExpLiterals: true,
                        ignoreStrings: true,
                        ignoreTemplateLiterals: true,
                    },
                ],
                'import/no-unresolved': [
                    'error',
                    {
                        caseSensitive: true,
                    },
                ],

                'no-unused-vars': 'error',
                'no-undef': 'error',
                'arrow-parens': ['error', 'as-needed'],
                'no-await-in-loop': 'error',
            },
        },
    ],
};
