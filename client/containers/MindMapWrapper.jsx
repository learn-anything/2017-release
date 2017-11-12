import React, { Component } from 'react';

import MapRender from 'containers/MapRender';
import { voteResource } from 'actions/Map';
import { showDialog } from 'actions/Dialog';
import store from 'store/store';
import { imgFormat, categoryToIMG } from 'utils/renderMapUtils';

export default class MindMapWrapper extends Component {
  render() {
    return (<MapRender />);
  }
}

// TODO - remove everything from here to the end of the file.
// Temporary, until we merge la-map into this repo.

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
      const [resourceID, direction] = t.getAttribute('data').split(',');
      store.dispatch(voteResource(resourceID, direction));
    }
  });
});
