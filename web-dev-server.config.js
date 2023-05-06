const { esbuildPlugin } = require("@web/dev-server-esbuild");

module.exports = {
    open: true,
    watch: true,
    appIndex: "src/html/index.html",
    nodeResolve: {
        exportConditions: ["development"],
    },
    rootDir: "./",
    plugins: [esbuildPlugin({ ts: true })],
};
