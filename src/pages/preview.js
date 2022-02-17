import React from 'react';
import SbEditable from 'storyblok-react';
import GetQueryParameter from '@utils/getQueryParameter';
// import config from '../../gatsby-config';

import Layout from "@components/layout";
import DynamicComponent from '@components/DynamicComponent';
import EditorPlaceholder from '@components/placeholder';

let sbConfig = {};
let relations = '';

const loadStoryblokBridge = function (cb) {
  // let sbConfigs = config.plugins.filter(item => item.resolve === 'gatsby-source-storyblok');
  let sbConfigs = {};
  let script = document.createElement('script');

  sbConfig = sbConfigs.length > 0 ? sbConfigs[0] : {};

  // Set content relations from config
  // Required by when referencing one or more page from another.
  relations = sbConfig.options.resolveRelations.join(',');

  script.type = 'text/javascript';
  script.src = `//app.storyblok.com/f/storyblok-latest.js?t=${sbConfig.options.accessToken}`;
  script.onload = cb;
  document.getElementsByTagName('head')[0].appendChild(script);
}

class Preview extends React.Component {
  state = { story: null };

  componentDidMount() {
    loadStoryblokBridge(() => {
      this.initStoryblokEvents();
    });
  }

  loadStory(payload) {
    window.storyblok.get({
      slug: GetQueryParameter('path'),
      version: 'draft',
      resolve_relations: relations,
    }, data => {
      this.setState({ story: data.story });
    })
  }

  initStoryblokEvents() {
    const sb = window.storyblok;

    this.loadStory({ storyId: GetQueryParameter('path') });
    sb.on(['change', 'published'], payload => this.loadStory(payload));

    sb.on('input', payload => {
      if (this.state.story && payload.story.id === this.state.story.id) {
        window.storyblok.resolveRelations(payload.story, [relations], () => {
          this.setState({ story: payload.story });
        });

      }
    })

    sb.pingEditor(() => {
      if (sb.inEditor) sb.enterEditmode();
    });
  }

  render() {
    if (this.state.story === null || !this.state.story.content.body) {
      return <EditorPlaceholder />;
    }

    const content = this.state.story.content;

    return (
      <Layout>
        <SbEditable content={content}>
          {content.body && <DynamicComponent blok={content} />}
        </SbEditable>
      </Layout>
    )
  }
};

export default Preview;
