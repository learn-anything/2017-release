<div align="center">
<h1><a href="https://learn-anything.xyz">Search engine for mind maps on the web 🚀</a></h1>
<a href="https://knowledge-map.slack.com/shared_invite/MTgxNTYzMjIzNjM5LTE0OTQzMzA4MDAtYzY1YWY0ZDc0NQ">
		<img src="https://img.shields.io/badge/Slack-💬-green.svg">
	</a>	<a href="https://github.com/learn-anything/search-engine/blob/master/LICENSE">
		<img src="https://img.shields.io/pypi/l/pipenv.svg">
	</a>

<p align="center"><img src="https://raw.githubusercontent.com/learn-anything/img/master/i_want_to_learn.mp4.gif" alt="img" width="600"></p>
</div>

<h1 align="center"> Build it 🚀 </a></h1>

To run it locally, clone the project and run

```
npm install

npm start
```

And then connect to http://localhost:3000

If you want to help, there is an [active slack group](https://knowledge-map.slack.com/) that you can join.

<h1 align="center"> Description </a></h1>

This is a search engine similar to [DuckDuckGo](https://duckduckgo.com/) but instead of providing a static set of links, it provides an interactive mind map of best of the best peer reviewed resources one can use to learn any of the topics in a guided way.

All mind maps will soon be open source so that anyone can edit and contribute to the open index of this search.

This is the first of its kind visual search engine that searches curated user mind maps on the web. It does not crawl the web for content, instead it searches through 'human curated' database of interlinked mind maps focused on learning in a guided and linear way.

<h1 align="center"> Future 🔭 </a></h1>

We plan to move the content of all mind maps to a graph database to allow for more meaningful queries.

First however, we need to solve the contributing problem. Currently curation is done though [GitHub issues](https://github.com/nikitavoloboev/learn-anything/issues) and it is working quite well. However we want users to be able to create mind maps of their own creation or extend visually the mind maps that we already have.

For that, we are attempting to create a way where a person can edit the source code of any of the mind maps by writing out the structure and content of it. Then an algorithm will take this code and create a visual representation mind map of it which can then be integrated with all the different mind maps in the database.

The end goal is to make this process even simpler by adding 'live edit' functionality to each of the mind map results in the [search engine](https://learn-anything.xyz). User can right in the search engine, press an edit button, move nodes around, add or remove links and then press 'submit button' and a pull request on GitHub will be generated with the changes which can then be reviewed by trusted members of the project.

This however requires quite a lot of infrastructure to be written out and for it to work really well will most likely require quite a lot of time and effort.

Fortunalely, both these mind maps and the search engine is fully open source so anyone who is interested in this idea and loves using this search engine, can come in and help.

<h1 align="center"> Join our team 🚀 </a></h1>

Join [our Slack channel](https://knowledge-map.slack.com/shared_invite/MTgxNTYzMjIzNjM5LTE0OTQzMzA4MDAtYzY1YWY0ZDc0NQ) and we can discuss ideas together and work on making this vision of visualising and structuring all of world's knowledge a reality.

<h2 align="center">Current Team</h2>

<table>
  <tbody>
    <tr>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://avatars1.githubusercontent.com/u/13448636?v=3&s=400">
        <br>
        <a href="https://github.com/nglgzz"> Angelo Gazzola </a>
        <p>Lead Web Developer</p>
        <br>
        <p>Created a complete and working version of the <a href="https://learn-anything.xyz">Search Engine</a> + our own mind map render system as <a href="https://github.com/learn-anything/react-mindmap"> React Component </a></p>
      </td>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://pbs.twimg.com/profile_images/712426493868056576/hRaMUdgf.jpg">
        <br>
        <a href="https://github.com/nikitavoloboev">Nikita Voloboev</a>
        <p>Oversees curation of mind maps</p>
        <br>
        <p>Curated the entire index of all the mind maps up until this point + helps with making search the best it can be</p>
      </td>
     </tr>
  </tbody>
</table>
