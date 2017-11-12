import React, { Component } from 'react';
import { connect } from 'react-redux';
import LAMap from 'la-map';
import axios from 'axios';

import { updateResource } from 'actions/Map';
import { showDialog } from 'actions/Dialog';
import store from 'store/store';


// eslint-disable-next-line no-shadow
@connect(store => ({
  nodes: store.map.nodes,
  resources: store.map.resources,
  mapID: store.map.mapID,
  votes: store.map.votes,
}))
export default class MindMapWrapper extends Component {
  vote(resourceID, direction, nodeID) {
    if (window.laAuth.isAuthenticated()) {
      axios({
        method: 'post',
        url: '/api/votes',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        data: {
          resourceID,
          direction,
        },
      }).then(({ data }) => {
        this.props.dispatch(updateResource(nodeID, data, Number(direction)));
        // eslint-disable-next-line no-console
      }).catch(err => console.error(err));
    } else {
      // eslint-disable-next-line no-shadowconsole
      this.props.dispatch(showDialog(__('unauthorized_dialog')));
      console.warn('You\'re not logged in');
    }
  }

  render() {
    return (
        <LAMap
          nodes={this.props.nodes}
          resources={this.props.resources}
          mapID={this.props.mapID}
          vote={this.vote.bind(this)}
          votes={this.props.votes}
        />
    );
  }
}

// TODO - remove everything from here to the end of the file.
// Temporary, until we merge la-map into this repo.
const imgFormat = imgName => (imgName ? `/static/icons/${imgName}.svg` : '');
const categoryToIMG = {
  mindmap: 'arrow',
  wiki: 'wiki',
  'stack exchange': 'stack',
  course: 'course',
  'free book': 'free-book',
  'non-free book': 'non-free-book',
  paper: 'research',
  video: 'video',
  article: 'article',
  blog: 'article',
  github: 'github',
  interactive: 'interactive',
  image: 'images',
  podcast: 'podcast',
  newsletter: 'newsletter',
  chat: 'chat',
  youtube: 'video',
  reddit: 'reddit',
  quora: 'quora',
  undefined: 'other',
  // undefined: '',
};

// Also temporary, until we merge la-map into this repo.
const resourceToHTML = ({ url, score, text, resourceID, parentID, category }) => {
  const { votes } = store.getState().map;
  const vote = votes.find(v => v.resourceID === resourceID);

  let upHiglighted;
  let downHiglighted;

  if (vote) {
    upHiglighted = Number(vote.direction) === 1;
    downHiglighted = Number(vote.direction) === -1;
  }
  const imgSrc = imgFormat(categoryToIMG[category]);

  return `
    <div class="resource">
      <a href="${url}" class="resource-link">
        <div class="category">
          <img src="${imgSrc}" alt="${category}" />
        </div>
        <div class="resource-text">
          ${text}
        </div>
      </a>
      <div class="score">
        <div data="${resourceID},-1,${parentID}" class="downvote downvote-dialog ${downHiglighted && 'downvote--highlighted'}">&minus;</div>
        <div class="score-value">${score.up - score.down}</div>
        <div data="${resourceID},1,${parentID}" class="upvote upvote-dialog ${upHiglighted && 'upvote--highlighted'}">&plus;</div>
      </div>
    </div>
  `;
};

window.MindMapWrapper = MindMapWrapper;

// Aaand you guessed it.. This is also temporary.
window.addEventListener('load', () => {
  // Catch clicks on .resources-show-more
  document.body.addEventListener('click', (e) => {
    const t = e.target;

    if (t.className === 'resources-show-more') {
      const nodeID = t.getAttribute('data-nodeID');
      const nodeText = t.getAttribute('data-nodeText');
      const resources = store.getState().map.resources[nodeID];

      store.dispatch(showDialog(`
        <h1 class="title-text">${nodeText}</h1>
        <div class="node-resources">
          ${resources.map(resource => resourceToHTML(resource)).join('')}
        </div>
        <div class="md-separator"></div>
      `));
    }

    if (t.className.includes('downvote-dialog') || t.className.includes('upvote-dialog')) {
      const [resourceID, direction, nodeID] = t.getAttribute('data').split(',');

      if (window.laAuth.isAuthenticated()) {
        axios({
          method: 'post',
          url: '/api/votes',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
          data: {
            resourceID,
            direction,
          },
        }).then(({ data }) => {
          store.dispatch(updateResource(nodeID, data, Number(direction)));
          // eslint-disable-next-line no-console
        }).catch(err => console.error(err));
      } else {
        // eslint-disable-next-line no-shadowconsole
        store.dispatch(showDialog(__('unauthorized_dialog')));
        console.warn('You\'re not logged in');
      }
    }
  });
});
