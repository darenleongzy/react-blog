require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/react"],
});

const router = require("./router").default;
const Sitemap = require("react-router-sitemap").default;
const axios = require("axios");
async function generateSitemap() {
  try {
    let urlMap = [];
    axios
      .get("https://api-dot-darenleong-webapp.et.r.appspot.com:/api/articles")
      .then((response) => {
        response.data.articles.map((article) => {
          console.log(article.urlTitle);
          urlMap.push({
            urlTitle: article.urlTitle,
            articleId: article._id,
          });
        });
        console.log(urlMap);
        const paramsConfig = {
          "/article/:urlTitle/:articleId": urlMap,
        };
        return new Sitemap(router)
          .applyParams(paramsConfig)
          .build("https://dalezy.com")
          .save("./dist/sitemap.xml");
      })
      .catch((error) => console.log(error.response));
    // pathname: "/article/" + urlTitle + "/" + data.articles[index]._id,

    //    pathname: "/article/" + urlTitle + "/" + data.articles[index]._id,
    //    state: { article: data.articles[index] },
  } catch (e) {
    console.log(e);
  }
}
generateSitemap();
