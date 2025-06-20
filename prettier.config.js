// prettier.config.js, .prettierrc.js, prettier.config.cjs, or .prettierrc.cjs

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  bracketSameLine: true,
  // trailingComma: "es5",
  // tabWidth: 4,
  // semi: false,
  // singleQuote: true,
  plugins: [require("prettier-plugin-tailwindcss")],
};

module.exports = config;
