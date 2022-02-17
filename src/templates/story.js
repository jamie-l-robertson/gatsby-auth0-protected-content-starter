// Used by onCreatPage to generate all our static pages.
import React from 'react';
import DynamicComponent from '@components/DynamicComponent';
// import Layout from '@components/layout';
import StoryblokService from '@utils/storyblokService';
// import SEO from '@components/molecules/seo';

export default class extends React.Component {
  state = {
    story: {
      content: JSON.parse(this.props.pageContext.story.content),
      tags: this.props.pageContext.story.tag_list || []
    }
  }

  async getInitialStory() {
    StoryblokService.setQuery(this.props.location.search);

    let { data: { story } } = await StoryblokService.get(`cdn/stories/${this.props.pageContext.story.full_slug}`);

    return story;
  }

  async componentDidMount() {
    let story = await this.getInitialStory();

    if (story.content) this.setState({ story });
    setTimeout(() => StoryblokService.initEditor(this), 200)
  }

  render() {
    const metadata = this.state.story.content.Meta;
    if (metadata && !metadata.title) metadata.title = this.state.story.name;

    return (

        <DynamicComponent blok={this.state.story.content} tags={this.state.story.tag_list} key={this.props.pageContext.story._uid} />

    )
  }
}