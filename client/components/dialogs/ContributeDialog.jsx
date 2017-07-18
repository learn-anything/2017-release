import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from './Dialog.jsx';
import { hideContribute } from '../../actions/dialogs';
import openNewTab from '../../utils/openNewTab';
import '../../sass/_ContributeDialog.sass';

@connect(store => store.dialogs.contribute)
export default class ContributeDialog extends Component {
  redirect() {
    openNewTab('Contribution', 'accept guidelines', this.props.url);
  }

  reject() {
    this.props.dispatch(hideContribute());
  }

  render() {
    if (!this.props.visible) {
      return null;
    }

    return (
      <Dialog
        title="Contribution guidelines"
        accept="Continue"
        centered={false}
        onReject={this.reject.bind(this)}
        onAccept={this.redirect.bind(this)}
      >
        <div className="contribute-dialog">
          <p>Thank you for wanting to improve the mind map. </p>
          <p>As all of these maps live on GitHub, changing or adding new content means adding content on GitHub itself. Fortunately the way these maps are represented in code is really simple so adding and changing things should be really easy. </p>
          <p>The changes you make however should follow our guidelines which focus on providing the most efficient paths for learning any topic on Earth.</p>
          <h3>Guidelines</h3>
          <ul>
            <li>All <b>maps should feel very similar</b>.</li>
            <li>They <b>all have</b> a <b>main node</b> that most often links to a wiki article. This main node often has a reddit or stack exchange community as well as a GitHub awesome list attached to it if such exist. It can also have GitHub repository of this topic attached if it is a software project. From there you have a <b>basics node</b> that gives the most efficient ‘step by step’ path for learning that topic.</li>
            <li>The resources for learning can include anything. Books, courses, videos, interactive visualisations. <b>It does not matter how popular the resource is, the only thing that matters is that it explains things well and is ideally free.</b> Certain books are not free and a Goodreads page to them will be provided. The steps represent the order with which the resources should ideally be covered in. Often the same step can have multiple resources. That’s okay. </li>
            <li>Aside from ‘basics’ and main node, <b>you can add additional material</b> that ‘helps’ learning the content. You can also add some interesting links that are related to the topic. Some examples may include a <b>help node</b> with cheat sheets or summaries. An <b>interesting node</b> with various interesting links like talks or articles. A <b>tools node</b> with various tooling related to the topic. An <b>articles node</b> with a list of articles related to the topic. The resources that can be included here should also be of high quality and related to the topic. For articles and talks, it is best to prefix it with the year in which the article, talk was produced in. We abbreviate years for visual clarity so an article prefixed with ’17:’ means that the article was written in 2017.</li>
            <li><b>From the basics node, the map branches into new topics (usually other maps). The branching has to be very clear.</b> So for example ‘programming languages’ are under ‘programming’. We understand that knowledge is ultimately a graph and not a tree of branches and we try to show this interconnectedness of everything the best we can. </li>
          </ul>

          <h3>Syntax</h3>
          <p>All maps are stored in JSON format and can be easily edited.</p>
          <pre>
{`{
  "title": "life---hobbies",
  "description": "A hobby is a regular activity that is done for enjoyment, typically during one's leisure time.",
  "tag": "hobbies",
  "connections": [
    ...
  ],
  "key": "hobbies",
  "nodes": [
    ...
  ]
}`}
          </pre>
          <p>This is the top level of a map, here some meta information is specified, like:</p>
          <ul>
            <li><b>title:</b> path of the map in the knowledge graph.</li>
            <li><b>description (optional):</b> short description of the topic, which will display when sharing links of the map.</li>
            <li><b>tag (optional):</b> custom tag for the search, will be prioritized over the map name if specified. For instance, the map called <code>R</code> has an <code>R programming language</code> tag.</li>
          </ul>

          <p>Then there is some other information that is directly used for rendering of maps:</p>
          <ul>
            <li><b>nodes:</b> a list of nodes with their respective name and link to resources.</li>
            <li><b>connections:</b> a list with the connections between all nodes.</li>
          </ul>

          <h4>Nodes</h4>
          <p>Here is an example of a node:</p>
          <pre>
{`{
  "text": "python",
  "url": "http://www.wikiwand.com/en/Python_(programming_language)",
  "fx": -13.916222252976013,
  "fy": -659.1641376795345,
  "category": "wiki",
  "note": "",
  "nodes": []
}`}
          </pre>
          <p>The possible attributes are:</p>
          <ul>
            <li><b>text:</b> text that will appear on the node.</li>
            <li><b>url:</b> resource tied to that node.</li>
            <li><b>category:</b> category that will be used to generate an emoji.</li>
            <li><b>note:</b> note that will show when hovering the node.</li>
            <li><b>fx and fy (optional):</b> coordinates of the node (you probably don't want to specify these as it's pretty complicated to get them at the moment).</li>
            <li><b>nodes:</b> a list of subnodes which have the same structure as nodes (subnodes are those resources that are listed next to a node, for instance basics always has subnodes).</li>
          </ul>

          <h4>Connections</h4>
          <p>Here is an example of a connection:</p>
          <pre>
{`{
  "source": "python",
  "target": "basics",
  "curve": {
    "x": -43.5535,
    "y": 299.545
  }
}`}
          </pre>
          <p>Here are the possible attributes:</p>
          <ul>
            <li><b>source:</b> text of the node where the connection starts</li>
            <li><b>target:</b> text of the node where the connection ends</li>
            <li><b>curve (optional):</b> coordinates for generating the curve of the connection (same story as the coordinates above, you can leave it as <code>"curve": {'{}'}</code>)</li>
          </ul>
          <h3>Stuck?</h3>
          <p>You can head to our <a href="https://knowledge-map.slack.com/shared_invite/MTgxNTYzMjIzNjM5LTE0OTQzMzA4MDAtYzY1YWY0ZDc0NQ">Slack group</a> and we'll be really happy to help you!</p>
        </div>
      </Dialog>
    );
  }
}
