As it currently stands, my project lacks discverability and is quite confusing to newcomers. I try to mention ways in which one can get value from it but it is still not intuitive. 

Also not all have the ability to use Alfred nor use macOS so [my launcher](https://github.com/nikitavoloboev/alfred-knowledge-map) that I provide is also useless to majority of people. 



The solution to this, is to create a web interface similar in functionality to [Google](https://google.com/) or [DuckDuckGo](https://duckduckgo.com/) but it won't give a list of results. Instead it will just autocomplete the query typed by the user from the [index](https://github.com/nikitavoloboev/knowledge-map#mindmap-index-%EF%B8%8F) and present a mind map instantly in the same web page similar to what you can see [here](https://my.mindnode.com) but bigger.

#Implementation

###1.

I should create an index of search results based on a [markdown file](https://raw.githubusercontent.com/nikitavoloboev/alfred-knowledge-map/master/research.md). It should be wary of nesting, that is if there are nested links like here : 

![](http://i.imgur.com/iPqfccc.png)

It would take that into account and present 'analysis' result in context of its parents which in this case is 'algorithms' so the search query will look something like this : 

![](http://i.imgur.com/2TPMO9D.png)

###2.

I am not too familiar with how search engines work exactly but assume it will store these links into some kind of key-value database. So step 2 is saving this data succesfully in this database.

###3. 

Now I need to implement a simple web interface to allow for results searching and leaving enough space to present infomation as this mind map. The focus should be on performance and good user experience browsing the mind map on the same web page. 

###4.

In this step, I should try and connect the web interface created to the database so everything works smoothly.

###5. 

Perhaps something interesting will come from the implementation but the idea is simple. Provide a web search interface to the mind maps and preset them in a user friendly way.

###6.

I also wish to extend this search engine and take the idea of [DuckDuckGo's instant answers](https://duckduckgo.com/api) and implement a way for users to make their own search engine with ease. It should follow a rule where you supply it a list of links similar to how my [index](https://raw.githubusercontent.com/nikitavoloboev/alfred-knowledge-map/master/research.md) looks and from it will construct a database and allow other people to search through it. These link don't necessarily have to be mind maps and can be any arbitrary link from the web. In the future it would be really neat to have community made 'search engines' of their own. Will see though.

If you wish to help with this project, I would love that. Send me a [message](mailto:nikita.voloboev@gmail.com) and we can work together. 

I wish Google or someone else has made something like this and presented all the knowledge of the world in a visual way instead of giving us a box to which we can type our questions into. Visualisation is key to uderstanding. I have made this project with mind maps for myself as I found no better system to keep my knowledge and bookmarks but I really think that as I improve and iterate on it, any one curious enough can get a ton of value from it. 
