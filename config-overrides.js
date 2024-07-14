const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@application": "src/application",
    "@domain": "src/domain",
    "@infrastructure": "src/infrastructure",
    "@routes": "src/routes",
    "@presentation": "src/presentation",
    "@pages": "src/pages",
    "@config": "src/config",
    "@assets": "src/assets",
  })(config);

  return config;
};
