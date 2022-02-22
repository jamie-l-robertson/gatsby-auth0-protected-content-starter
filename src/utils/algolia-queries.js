const searchQuery = `{
  stories: allStoryblokEntry(filter: {lang: { ne: "es" }}) {
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
}`;


function pageToAlgoliaRecord({ node: { id, slug, name, content, ...rest }  }) {

  const contentData = JSON.parse(content); 
  
  const title = contentData.seo?.title || '';
  const description = contentData.seo?.description || '';

  return {
    objectID: id,
    slug,
    name,
    title,
    description,
    ...rest,
  }
}

const indexName = "Stories";

const queries = [
  {
    query: searchQuery,
    transformer: ({ data }) => data.stories.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`intro:20`] }
  },
];

module.exports = queries;