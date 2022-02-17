import { useEffect, useState } from "react";
import StoryblokClient from "storyblok-js-client";

const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  cache: {
    clear: "auto",
    type: "memory",
  },
});

export default function useStoryblok(originalStory, location) {

    let [story, setStory] = useState(originalStory);

    if(story && typeof story.content === "string") {
      story.content = JSON.parse(story.content);
    }
    
    function initEventListeners() {
      const { StoryblokBridge } = window;

      if (typeof StoryblokBridge !== 'undefined') {

        const storyblokInstance = new StoryblokBridge();

        storyblokInstance.on(['published', 'change'], event => window.location.reload(true));
    
        storyblokInstance.on(['input'], event => {
          if (event.story._uid === story._uid) setStory(event.story);
        });

        storyblokInstance.on(['enterEditmode'], event => {
          Storyblok
            .get(`cdn/stories/${event.storyId}`, { version: 'draft' })
            .then(({ data }) => {
              if(data.story) setStory(data.story);
            })
            .catch((error) => console.log(error));
        }) 
      }
    }

    function addBridge(callback) {
        const existingScript = document.getElementById("storyblokBridge");

        if (!existingScript) {
          const script = document.createElement("script");
          script.src = `//app.storyblok.com/f/storyblok-v2-latest.js`;
          script.id = "storyblokBridge";
          document.body.appendChild(script);

          script.onload = () => {
            callback();
          };

        } else {
            callback();
        }
    }

    useEffect(() => {
      // load bridge only inside the storyblok editor
      if(location.search.includes("_storyblok")) {
        // first load the bridge and then attach the events
        addBridge(initEventListeners);
      }
    }, []);

    return story;
}
