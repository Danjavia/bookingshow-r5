const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
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
);
