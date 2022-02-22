require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

// @TODO: ADD Algolia search indexing
module.exports = {
  siteMetadata: {
    title: `Gatsby Starter`,
    description: ``,
    author: ``,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@theme": "src/theme",
          "@components": "src/components",
          "@contentTypes": "src/contentTypes",
          "@utils": "src/utils",
          "@hooks": "src/hooks"
        },
        extensions: ["js", "tsx"],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-source-storyblok',
      options: {
        accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
        localAssets: true,
        resolveRelations: [],
      }
    },
    {
      resolve: `gatsby-plugin-apollo`,
      options: {
        uri: `${process.env.STORYBLOK_GRAPHQL_API}`,
        headers: {
          token: process.env.STORYBLOK_ACCESS_TOKEN
        }
      }
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require('./src/utils/algolia-queries'),
        continueOnFailure: true,
      }
    }
  ]
};