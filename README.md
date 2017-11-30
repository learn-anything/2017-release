<p align="center">
    <img src="https://i.imgur.com/gdVn417.png" width="128" height="128">
</p>
# Learn Anything [![Slack](https://img.shields.io/badge/Slack%20Group-💬-green.svg)](https://knowledge-map.slack.com/shared_invite/MTgxNTYzMjIzNjM5LTE0OTQzMzA4MDAtYzY1YWY0ZDc0NQ) [![Twitter](https://img.shields.io/twitter/follow/learnanything_.svg?style=social&label=Follow&style=flat-square)](https://twitter.com/learnanything_) [![travis badge](https://travis-ci.org/learn-anything/learn-anything.svg?branch=master)](https://travis-ci.org/learn-anything/learn-anything) [![Support](https://img.shields.io/badge/Suport%20Us-💗-ff69b4.svg)](https://www.patreon.com/learnanything)
> [Learn Anything](https://learn-anything.xyz/) is an Open Source Website built by community to Learn Anything with Interactive Mind Maps

If you want to know more about what we're trying to solve, our plans for the future, how to improve the maps, and more you can check the [wiki](https://github.com/learn-anything/learn-anything/wiki).

**Note:** If you're looking for the maps, they're in the `maps` folder. We merged
the maps and the app repos, as it will make it easier to manage docs, issues and
PRs. We're making the last changes before the new version goes live, so this README
and the structure of the repo itself, might change a bit in the next few days.

## Getting Started
These instructions will allow you to set up your own instance of Learn Anything
to develop with.

### Dependencies
Elasticsearch is needed for fetching maps and suggestions on the website. On
Linux you can download and run it with the following commands.

    wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.5.2.tar.gz
    tar -zxf elasticsearch-5.5.2.tar.gz
    ./elasticsearch-5.5.2/bin/elasticsearch

### Running
Once you have Elasticsearch up and running you can start your local instance of
Learn Anything with the commands below.

    git clone https://github.com/learn-anything/learn-anything
    cd learn-anything
    git checkout contrib
    npm run setup
    npm start

And then connect to [localhost:3000](http://localhost:3000).

The first time it may take a while, since all maps will be added to elasticsearch.
After that only `npm start` will be needed.


## Testing
To run automated tests you can use either `npm test` or `npm run test:watch`.
For now the tests are covering only reducers, action creators, and components.


## API
Our API is still work in progress, as there will be more endpoints coming in the
future, but for now here's a list of all endpoints.

Note: the full url for any endpoint is `[url]/api/[endpoint]`, for instance if
you're developing locally to get a random map you'd use `http://localhost:3000/api/maps`.

| Endpoint                                | Method | Parameters | Description                     |
|-----------------------------------------|:------:|:----------:|---------------------------------|
| [/maps](#get-maps)                      | GET    | q          | get suggestions or a random map |
| [/maps/[id]](#get-mapsid)               | GET    | -          | get map by ID                   |
| [/maps/path/to/map](#get-mapspathtomap) | GET    | -          | get map by path                 |

#### GET /maps
Return a list of suggestions to complete the string in the **q** parameter.
Each suggestion is in the form of:

```json
{
  "key": "markup languages",
  "id": "1507",
  "nodesCount": 3
}
```

**key** is the search tag for the map, **id** is the ID to retrieve it, and
**nodesCount** is the number of nodes present on that map.

If **q** is not specified a list with one random suggestion will be returned,
otherwise a maximum of 10 relevant suggestions are returned.

#### GET /maps/[id]
Get a specific map by ID. Maps have the following format:

```json
{
  "title": "learn anything - programming - markup languages",
  "tag": "",
  "nodes": [],
  "connections": [],
  "key": "markup languages"
}
```

- **title** is the path to a map
- **tag** is a custom tag for searching the map
- **key** is the same as *tag* if *tag* is specified, otherwise it's the last topic on *title*
- **nodes** a list of the nodes contained on the map
- **connections** a list of the connections between the nodes

#### GET /maps/path/to/map
Get a specific map from its path. The format is the same as the one above.


## Contributing
If you want to help, you're stuck somewhere, or just want to have a chat with us, you can join our [Slack channel](https://knowledge-map.slack.com/).


## Team
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
