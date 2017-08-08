Thank you for wanting to improve the mind map.

As all of these maps live on GitHub, changing or adding new content means adding content on GitHub itself. Fortunately the way these maps are represented in code is really simple so adding and changing things should be really easy.

The changes you make however should follow our guidelines which focus on providing the most efficient paths for learning any topic on Earth.

### Guidelines

- All **maps should feel very similar**.
- They **all have a main node** that most often links to a wiki article. This main node often has a reddit or stack exchange community as well as a GitHub awesome list attached to it if such exist. It can also have GitHub repository of this topic attached if it is a software project. From there you have a **basics node** that gives the most efficient ‘step by step’ path for learning that topic.
- The resources for learning can include anything. Books, courses, videos, interactive visualisations. **It does not matter how popular the resource is, the only thing that matters is that it explains things well and is ideally free.** Certain books are not free and a Goodreads page to them will be provided. The steps represent the order with which the resources should ideally be covered in. Often the same step can have multiple resources. That’s okay.
- Aside from ’basics’ and main node, **you can add additional material** that ‘helps’ learning the content. You can also add some interesting links that are related to the topic. Some examples may include a **help node** with cheat sheets or summaries. An **interesting node** with various interesting links like talks or articles. A **tools node** with various tooling related to the topic. An **articles node** with a list of articles related to the topic. The resources that can be included here should also be of high quality and related to the topic. For articles and talks, it is best to prefix it with the year in which the article, talk was produced in. We abbreviate years for visual clarity so an article prefixed with ’17:’ means that the article was written in 2017.
- **From the basics node, the map branches into new topics (usually other maps). The branching has to be very clear.** So for example ‘programming languages’ are under ‘programming’. We understand that knowledge is ultimately a graph and not a tree of branches and we try to show this interconnectedness of everything the best we can.

### Syntax
All maps are stored in JSON format and can be easily edited.

<pre>
{
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
}
</pre>

This is the top level of a map, here some meta information is specified, like:

- **title:** path of the map in the knowledge graph.
- **description (optional):** short description of the topic, which will display
when sharing links of the map.
- **tag (optional):** custom tag for the search, will be prioritized over the map
name if specified. For instance, the map called `R` has an `R programming language` tag.

Then there is some other information that is directly used for rendering of maps:

- **nodes:** a list of nodes with their respective name and link to resources.
- **connections:** a list with the connections between all nodes.

#### Nodes
Here is an example of a node:

<pre>
{
  "text": "python",
  "url": "http://www.wikiwand.com/en/Python_(programming_language)",
  "fx": -13.916222252976013,
  "fy": -659.1641376795345,
  "category": "wiki",
  "note": "",
  "nodes": []
}
</pre>

The possible attributes are:

- **text:** text that will appear on the node.
- **url:** resource tied to that node.
- **category:** category that will be used to generate an emoji.
- **note:** note that will show when hovering the node.
- **fx and fy (optional):** coordinates of the node (you probably don't want to
specify these as it's pretty complicated to get them at the moment).
- **nodes:** a list of subnodes which have the same structure as nodes
(subnodes are those resources that are listed next to a node, for instance basics always has subnodes).

#### Connections
Here is an example of a connection:

<pre>
{
  "source": "python",
  "target": "basics",
  "curve": {
    "x": -43.5535,
    "y": 299.545
  }
}
</pre>

Here are the possible attributes:

- **source:** text of the node where the connection starts
- **target:** text of the node where the connection ends
- **curve (optional):** coordinates for generating the curve of the connection
(same story as the coordinates above, you can leave it as `"curve": {'{}'}`)

### Stuck?
You can head to our [Slack group](https://knowledge-map.slack.com/shared_invite/MTgxNTYzMjIzNjM5LTE0OTQzMzA4MDAtYzY1YWY0ZDc0NQ) and we'll be really happy to help you!
