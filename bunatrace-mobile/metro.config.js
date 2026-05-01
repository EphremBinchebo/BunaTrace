const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  "@screens": "./src/screens",
  "@navigation": "./src/navigation",
  "@services": "./src/services"
};

module.exports = config;
