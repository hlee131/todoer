const tailwindcss = require("tailwindcss");
module.exports = {
  plugins: [
    tailwindcss("./todoproject/frontend/src/tailwind/tailwind.js"),
    require("autoprefixer"),
  ],
};
