const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = {
  webpack: override(
    addWebpackAlias({
      "@application": path.resolve(__dirname, "src/application"),
      "@domain": path.resolve(__dirname, "src/domain"),
      "@infrastructure": path.resolve(__dirname, "src/infrastructure"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@presentation": path.resolve(__dirname, "src/presentation"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@config": path.resolve(__dirname, "src/config"),
      "@assets": path.resolve(__dirname, "src/assets"),
    }),
  ),
  jest: (config) => {
    const { pathsToModuleNameMapper } = require("ts-jest");
    const { compilerOptions } = require("./tsconfig.json");

    config.roots = ["<rootDir>/src"];
    config.modulePaths = [compilerOptions.baseUrl];
    config.moduleNameMapper = {
      ...config.moduleNameMapper,
      ...pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: "<rootDir>/",
      }),
    };
    config.setupFilesAfterEnv = ["<rootDir>/src/setupTests.ts"];
    config.testEnvironment = "jsdom";
    config.transform = {
      "^.+\\.(ts|tsx)$": "ts-jest",
    };
    config.testRegex = "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$";
    config.moduleFileExtensions = ["ts", "tsx", "js", "jsx", "json", "node"];

    return config;
  },
};
