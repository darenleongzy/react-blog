require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/react"],
});

const router = require("./router").default;
const Sitemap = require("react-router-sitemap").default;

new Sitemap(router).build("https://dalezy.com").save("./dist/sitemap.xml");
