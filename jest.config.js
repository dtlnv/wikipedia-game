module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}'],
};
