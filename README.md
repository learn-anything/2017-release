# Learn Anything [![Slack](https://img.shields.io/badge/Slack%20Group-💬-green.svg)](https://knowledge-map.slack.com/shared_invite/MTgxNTYzMjIzNjM5LTE0OTQzMzA4MDAtYzY1YWY0ZDc0NQ) [![Twitter](https://img.shields.io/twitter/follow/learnanything_.svg?style=social&label=Follow&style=flat-square)](https://twitter.com/learnanything_) [![travis badge](https://travis-ci.org/learn-anything/learn-anything.svg?branch=master)](https://travis-ci.org/learn-anything/learn-anything) [![Support](https://img.shields.io/badge/Suport%20Us-💗-ff69b4.svg)](https://www.patreon.com/learnanything)
> [Learn Anything](https://learn-anything.xyz/) is an Open Source Website built by community to Learn Anything with Interactive Maps

![](https://i.imgur.com/RBMvgDJ.png)

## Contents
- [What is Learn Anything?](#what-is-learn-anything)
- [Contributing](#contributing)
- [Developing the website](#developing-the-website)
- [API](#api)
- [Explore our Curated Lists](#explore-our-curated-lists)
- [Keep this project going 💜](#keep-this-project-going)

## What is Learn Anything?
[Learn Anything](https://learn-anything.xyz/) is an Open Source Website built by community to Learn Anything with Interactive Maps.

If you want to know more about what we're trying to solve, our plans for the future, how to improve the maps, and more you can check the [wiki](https://github.com/learn-anything/learn-anything/wiki).

## Contributing
You can contribute to the website in many ways. The most easiest thing you can do to help is to simply use the website and learn things with it. And if you found a resource you like, just add it so everyone can find it too.

Since this website is fully open source, you can also help and work on new and awesome features to add to the website. Read [`Developing the website`](#developing-the-website) section for more information on how to get started with this. And if you never programmed before and this is your first Open Source project, don't be afraid to join in. There are many people that can help you both get started and make your first contribution.

We have a [Slack channel](https://knowledge-map.slack.com/) we use for all our communication. Feel free to join in and learn and make this awesome thing together. 🦄

## Developing the website
### Getting Started
These instructions will allow you to set up your own instance of Learn Anything
to develop with.

## Dependencies
DynamoDB is a database needed for managing and storing maps. On linux you can download and run it with the following commands.

    wget https://s3-us-west-2.amazonaws.com/dynamodb-local/dynamodb_local_latest.zip
    unzip -a dynamodb_local_latest.zip   
    java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb


Elasticsearch is needed for fetching maps and suggestions on the website. On
Linux you can download and run it with the following commands.

    wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.5.2.tar.gz
    tar -zxf elasticsearch-5.5.2.tar.gz
    ./elasticsearch-5.5.2/bin/elasticsearch

### Running
Once you have Elasticsearch and DyamoDB up and running you can start your local instance of
Learn Anything with the commands below.

    git clone https://github.com/learn-anything/learn-anything
    cd learn-anything
    git checkout dev
    npm run setup
    npm start

And then connect to [localhost:3000](http://localhost:3000).

The first time it may take a while, since all maps will be added to elasticsearch.
After that only `npm start` will be needed.


### Testing
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


## Explore our Curated Lists
With our goal of providing the most efficient paths for Learning Anything, we also manage curation of various GitHub lists. 

Feel free to explore and improve them if you wish. 
- [Books 📚](https://github.com/learn-anything/books) 
- [Courses 📝](https://github.com/learn-anything/courses)
- [Research Papers 📃](https://github.com/learn-anything/research-papers) 
- [Blogs ️🗃️](https://github.com/learn-anything/blogs) 
- [Humans 👪 ](https://github.com/learn-anything/humans)
- [Quotes 💬](https://github.com/learn-anything/quotes)
- [Podcasts 🎙️](https://github.com/learn-anything/podcasts)
- [Newsletters 📮](https://github.com/learn-anything/newsletters) 
- [Images 🎨](https://github.com/learn-anything/images) 
- [Talks 👀](https://github.com/learn-anything/talks) 
- [Command Line Tools 🐚](https://github.com/learn-anything/command-line-tools) 
- [macOS apps 💻](https://github.com/learn-anything/macos-apps) 
- [iOS apps 📱](https://github.com/learn-anything/ios-apps) 
- [Safari Extensions 🌐](https://github.com/learn-anything/safari-extensions) 
- [Alfred Workflows 🎩](https://github.com/learn-anything/alfred-workflows) 
- [TV series 🎥](https://github.com/learn-anything/tv-series) 
- [Documentaries 🎥](https://github.com/learn-anything/documentaries) 
- [Movies 🎥](https://github.com/learn-anything/movies) 
- [Reddit 🤖](https://github.com/learn-anything/reddit)
- [Youtube 🎥](https://github.com/learn-anything/youtube) 
- [Quora ❓](https://github.com/learn-anything/quora) 
- [Computer games 💻](https://github.com/learn-anything/computer-games) 
- [Chrome Extensions 🌐](https://github.com/learn-anything/chrome-extensions)

## Keep this project going 💜
This project is **built by the community, for the community** and in our goals to make the most efficient paths and the best user experience possible in exploring the maps and finding the resources you need, we can only rely on donations made by our users to sustain this project.

There are **no advertisements** and **no sponsored content** in this website as that would defeat our vision of making the best and most optimal learning tracks for learning any topic in the world.
 
We have created a [Patreon page](https://www.patreon.com/learnanything) where you can support our work. Any donation that you make to this project is incredibly valuable to keep this project going. We also have some awesome rewards that come with your support.  

Thank you. 💚

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
        <p>Created a complete and working version of the <a href="https://learn-anything.xyz">Website</a> + our own mind map render system as <a href="https://github.com/learn-anything/react-mindmap"> React Component </a></p>
      </td>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://pbs.twimg.com/profile_images/712426493868056576/hRaMUdgf.jpg">
        <br>
        <a href="https://github.com/nikitavoloboev">Nikita Voloboev</a>
        <p>Oversees curation of maps</p>
        <br>
        <p>Curated the entire index of all the maps up until this point + helps with making search the best it can be</p>
      </td>
     </tr>
  </tbody>
</table>

## Thank you 💜
- To all the people who contributed to this project and this vision of liberating and visualising knowledge in this unique way.

## License
MIT © [Learn Anything](https://learn-anything.xyz/)
