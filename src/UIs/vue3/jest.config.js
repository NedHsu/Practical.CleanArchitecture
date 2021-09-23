const path = require('path')

module.exports = {
    rootDir: path.resolve(__dirname),
    clearMocks: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    // Alias
    moduleNameMapper: {
        '@/(.*)$': '<rootDir>/src/components/$1'
    },
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    // Test files
    testMatch: ['<rootDir>/src/__tests__/**/*.spec.(ts|tsx|js)'],
    testPathIgnorePatterns: ['/node_modules/'],
    moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '^.+\\.(ts|tsx|js|jsx)$': [
            'babel-jest', {
                presets: [
                    ['@babel/preset-env', { targets: { node: 'current' } }],
                    ['@babel/preset-typescript']
                ],
                plugins: ['@vue/babel-plugin-jsx']
            }
        ]
    }
}