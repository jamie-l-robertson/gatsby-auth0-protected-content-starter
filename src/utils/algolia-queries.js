const searchQuery = `
  query {
    pages: allSitePage {
      nodes {
        # try to find a unique id for each node
        # if this field is absent, it's going to
        # be inserted by Algolia automatically
        # and will be less simple to update etc.
        objectID: id
        component
        path
        componentChunkName
        jsonName
        internal {
          type
          contentDigest
          owner
        }
      }
    }
  }
`;

const indexName = "Stories";

const queries = [
  {
    query: searchQuery,
    transformer: ({ data }) => data.pages.nodes, // optional
    indexName,
    settings: { attributesToSnippet: [`intro:20`] },
    matchFields: ['slug', 'modified'],
    mergeSettings: false,
    queryVariables: {},
  },
];

module.exports = queries;