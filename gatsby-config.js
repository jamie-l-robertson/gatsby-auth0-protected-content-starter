require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

// @TODO: ADD Algolia search indexing
module.exports = {
  siteMetadata: {
    title: `Gatsby Starter`,
    description: ``,
    author: ``,
  },
  plugins: [
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
        localAssets: true
      }
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        queries: require('./src/utils/algolia-queries'),
        chunkSize: 1000,
        enablePartialUpdates: true,
        matchFields: ['slug', 'modified'],
        concurrentQueries: true,
        skipIndexing: false,
        continueOnFailure: false,
      }
    }
  ]
};