module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(test).ts?(x)"],
    transform: {
        "^.+\\.(js|ts)$": "ts-jest",
    },
    transformIgnorePatterns: [
        "/node_modules/(?!@autofiy/autofiyable).+\\.js$",
        "/node_modules/(?!@autofiy/autofiyable).+\\.ts$",
        "/node_modules/(?!@autofiy/autofiyable).+\\.tsx$",
    ],
}