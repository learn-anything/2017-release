import { event, zoom } from 'd3';

export const imgFormat = imgName => (imgName ? `/static/icons/${imgName}.svg` : '');
export const categoryToIMG = {
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

const resourcesToHTML = (nodeID, nodeText, resources, votes) => resources.map((resource, index) => {
  if (index === 5) {
    return `
      <div data-nodeID="${nodeID}" data-nodeText="${nodeText}" class="resources-show-more">
        Show ${resources.length - 5} more
      </div>
    `;
  }

  if (index > 5) {
    return '';
  }

  const {
    url,
    category,
    text,
    resourceID,
  } = resource;
  const imgSrc = imgFormat(categoryToIMG[resource.category]);

  const upHiglighted = Number(votes[resourceID]) === 1;
  const downHiglighted = Number(votes[resourceID]) === -1;

  return `
    <div class="resource">
      <a class="resource-link" href="${url}">
        <div class="category">
          <img src="${imgSrc}" alt="${category}"/>
        </div>
        <div class="resource-text">${text}</div>
      </a>

      <div class="score">
        <div data="${resourceID},-1,${nodeID}" class="downvote ${downHiglighted && 'downvote--highlighted'}">&minus;</div>
        <div class="score-value">${resource.score.up - resource.score.down}</div>
        <div data="${resourceID},1,${nodeID}" class="upvote ${upHiglighted && 'upvote--highlighted'}">&plus;</div>
      </div>
    </div>
  `;
}).join('');

/*
 * Return the HTML representation of a node.
 * The node is an object that has text, url, and category attributes;
 * all of them optional.
 */
export const nodeToHTML = (node, nodes = [], resources = [], votes = {}) => {
  let stat = '';

  if (nodes.length > 0) {
    stat += `${nodes.length} Nodes`;
  }

  if (resources.length > 0) {
    stat += stat && ' / ';
    stat += `${resources.length} Articles`;
  }

  if (resources.length === 0 || (resources.length === 1 && resources[0].category === 'mindmap')) {
    const categoryImage = resources[0] ? categoryToIMG[resources[0].category] : '';
    return `
      <div class="node--collapsed">
          <a class="node-resource" href="${(resources[0] && resources[0].url) || ''}">
            <div class="node-title">${node.text}</div>
            <div class="category">
              <img src="${imgFormat(categoryImage)}" alt="${resources[0] ? 'map' : ''}" />
            </div>
          </a>
      </div>
    `;
  }

  const sortedResources = resources.sort((a, b) => (
    (a.score.up - a.score.down) < (b.score.up - b.score.down)
  ));

  return `
    <div>
      <div class="node-header">
        <div class="node-title">${node.text}</div>
        <div class="node-stat">${stat}</div>
      </div>
      <div class="node-resources">
        ${resourcesToHTML(node.nodeID, node.text, sortedResources, votes)}
      </div>
    </div>
  `;
};


/*
 * Return the dimensions (width & height) that some HTML
 * with a given style would take in the page.
 */
export const getHTMLSize = (html, classname = '', style = {}) => {
  const el = document.createElement('span');
  const dimensions = {};

  // Set display: inline-block so that the size of el
  // will depend on the size of its children.
  el.style.display = 'inline-block';

  // Hide the element (it will be added to the page for a short time).
  el.style.visibility = 'hidden';

  el.className = classname;
  el.innerHTML = html;

  // Apply CSS rules.
  Object.keys(style).forEach((rule) => { el.style[rule] = style[rule]; });
  document.body.append(el);

  dimensions.width = el.offsetWidth;
  dimensions.height = el.offsetHeight;

  el.remove();
  return dimensions;
};

/*
 * Return pan and zoom behavior to use on d3.selection.call().
 */
export const d3PanZoom = el => (
  zoom().scaleExtent([0.3, 5])
    .on('zoom', () => {
      window.laMapTransform = event.transform;
      el.selectAll('svg > g').attr('transform', event.transform);
    })
);

/*
 * Return a dictionary with the level index as keys, and the maximum
 * width for each level as values.
 */
export const getLevelsWidth = (nodes) => {
  const levelsWidth = {};

  nodes.forEach((node) => {
    if (!levelsWidth[node.depth] || levelsWidth[node.depth] < node.data.width) {
      levelsWidth[node.depth] = node.data.width;
    }
  });

  return levelsWidth;
};
