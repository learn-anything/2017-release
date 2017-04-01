I want to build a search engine similar to [DuckDuckGo](https://duckduckgo.com/) but instead of providing a static set of links, I provide a mind map of best of the best peer reviewed resources one can collect to learn each of the topics. 

It's purpose is to let users query [the big mind map of knowledge](https://github.com/nikitavoloboev/knowledge-map) and receive visual mind maps that one can explore with links, videos, articles, gifs that help learn the subject at hand.

As I wish for this to be a community project where everyone can add their resource that they have found or made, I want this project to be fully open source.

Below is a rough guideline of how I am thinking of completing this project. If you are interested in this, I welcome any collobaration. Let's do it together. 

# Implementation

### 1.

I should create an index of search results based on a [markdown file](https://raw.githubusercontent.com/nikitavoloboev/alfred-knowledge-map/master/research.md). It should be wary of nesting, that is if there are nested links like here : 

![](http://i.imgur.com/iPqfccc.png)

It would take that into account and present 'analysis' result in context of its parents which in this case is 'algorithms' so the search query will look something like this : 

![](http://i.imgur.com/2TPMO9D.png)

### 2.

I am not too familiar with how search engines work exactly but assume it will store these links into some kind of key-value database. So step 2 is saving this data stored succesfully in this database.

### 3. 

Now I need to implement a simple web interface to allow for results searching and leaving enough space to present infomation as this mind map. The focus should be on performance and good user experience browsing the mind map on the same web page. 

### 4.

In this step, I should try and connect the web interface created to the database so everything works smoothly.

### 5. 

Perhaps something interesting will come from the implementation but the idea is simple. Provide a web search interface to the mind maps and preset them in a user friendly way.

### 6. 

I wish to extend this search engine to allow users to search through the entirety of the index of all the mind maps. So users don't have to explicitly type the name of the mind map they wish to go to but they can type few words and it will match these words with mind maps that contains these words and from then on users can choose the mind map they are intereste in. 

I can already do this locally and it is immensely useful : 

![](http://i.imgur.com/fGIJhQY.png)

Once that is implemented, it should become the standard implementation. 

The difficult part here is whether I can actually get such data for use. Will see.

### 7.

I also wish to extend this search engine and take the idea of [DuckDuckGo's instant answers](https://duckduckgo.com/api) and implement a way for users to make their own search engine with ease. It should follow a rule where you supply it a list of links similar to how my [index](https://raw.githubusercontent.com/nikitavoloboev/alfred-knowledge-map/master/research.md) looks and from it will construct a database and allow other people to search through it. These link don't necessarily have to be mind maps and can be any arbitrary link from the web. In the future it would be really neat to have community made 'search engines' of their own. Will see though.

