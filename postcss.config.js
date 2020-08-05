const tailwindcss = require("tailwindcss");
module.exports = {
  plugins: [
    tailwindcss("./todoproject/frontend/src/tailwind/tailwind.js"),
    require("autoprefixer"),
    process.env.NODE_ENV === "production" &&
      require("@fullhuman/postcss-purgecss")({
        content: [
          "./todoproject/frontend/templates/frontend/index.html",
          "./todoproject/frontend/src/components/**/*.jsx",
          "./todoproject/frontend/src/components/App.jsx",
        ],
        defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
      }),
  ],
};
