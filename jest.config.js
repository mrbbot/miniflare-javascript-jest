export default {
  // Use the Miniflare test environment for all tests:
  // https://miniflare.dev/testing/jest
  testEnvironment: "miniflare",
  testEnvironmentOptions: {
    // Miniflare doesn't yet support the `main` field in `wrangler.toml`, so we
    // need to explicitly tell it where our worker is.
    scriptPath: "src/index.js",
    // We also need to explicitly mark it as an ES module.
    modules: true,
    // Finally, mark all other `.js` files as `ESModule`s, instead of the
    // default `CommonJS`.
    modulesRules: [
      { type: "ESModule", include: ["**/*.js"], fallthrough: true },
    ],
  },
};
