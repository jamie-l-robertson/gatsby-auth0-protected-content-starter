exports.onCreatePage = async ({ page, actions: { createPage } }) => {
  /*
   * The dashboard (which lives under `/portal`) is a client-only route. That
   * means that we don’t want to build it server-side because it depends on data
   * that we won’t have until a user logs in. By using `matchPath`, we’re able
   * to specify the entire `/portal` path as a client-only section, which means
   * Gatsby will skip any `/portal/*` pages during the build step.
   *
   * Take a look at `src/pages/portal.js` for more details.
   */

  if (page.path.match(/^\/portal/)) {
    page.matchPath = '/portal/*';

    createPage(page);
  }
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    /*
     * During the build step, `auth0-js` will break because it relies on
     * browser-specific APIs. Fortunately, we don’t need it during the build.
     * Using Webpack’s null loader, we’re able to effectively ignore `auth0-js`
     * during the build. (See `src/utils/auth.js` to see how we prevent this
     * from breaking the app.)
     */

    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /auth0-js/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: 'empty'
    }
  })
}



const path = require('path');

exports.createPages = ({ page, graphql, actions: { createPage} }) => {

  return new Promise((resolve, reject) => {

    const storyblokEntry = path.resolve('src/templates/page.js');

    resolve(
      graphql(
        `{
          stories: allStoryblokEntry {
            edges {
              node {
                id
                name
                slug
                field_component
                full_slug
                content
              }
            }
          }
        }`
      ).then(result => {

        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const entries = result.data.stories.edges;

        entries.forEach( entry => {

           /*
            * The dashboard (which lives under `/portal`) is a client-only route. That
            * means that we don’t want to build it server-side because it depends on data
            * that we won’t have until a user logs in. By using `matchPath`, we’re able
            * to specify the entire `/portal` path as a client-only section, which means
            * Gatsby will skip any `/portal/*` pages during the build step.
            *
            * Take a look at `src/pages/portal.js` for more details.
            */

          if (entry.slug !== "home") {
            const page = {
              path: `/${entry.node.full_slug}`,
              component: storyblokEntry,
              context: {
                story: entry.node
              }
            }

            createPage(page);
          }

        });
    }));
  });
}
