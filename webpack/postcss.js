// Load plugins for postcss.
const autoPrefixer = require('autoprefixer');
const cssNano = require('cssnano');

// All Plugins used in production and development build.
module.exports = {
  plugins: {
    autoPrefixer,
    cssNano,
  }
};
