const dotenv = require("dotenv");

const { merge } = require("webpack-merge");

const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { EnvironmentPlugin } = require("webpack");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "rp";

  const { parsed } = dotenv.config();
  const environment = { ...parsed };

  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new EnvironmentPlugin(environment),
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
          environment: environment.ROOTs,
        },
      }),
    ],
  });
};
