module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parser: "@babel/eslint-parser",
    plugins: [
        "@babel",
    ],
    extends: [
        "eslint:recommended",
        "prettier"
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    settings: {
        "import/ignore": [".css$", ".scss$", "sass$", "node_modules/*"]
    },
    ignorePatterns: ["*.css", "*.scss", "*.sass"],
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
            env: {
                jest: true
            }
        }
    ]
};
