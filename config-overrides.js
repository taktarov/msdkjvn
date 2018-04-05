const rewireLess = require("react-app-rewire-less");
const rewireCssModules = require("react-app-rewire-css-modules");
module.exports = function override(config, env) {
  config = rewireCssModules(config, env);
  config = rewireLess(config, env);
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      "@primary-color": "#1890ff"
    }
  })(config, env);
  return config;
};
