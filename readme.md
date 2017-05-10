# Search engine for mind maps on the web

[![Slack](https://img.shields.io/badge/Slack-channel-green.svg)](https://knowledge-map.slack.com/)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/nikitavoloboev/knowledge-map/blob/master/LICENSE)

# Design mockup 🖌

![](http://i.imgur.com/JdSWY8B.png)

## There will also be ability to choose scope of search

![](http://i.imgur.com/b7reRcQ.png)

![](http://i.imgur.com/i5m9VB0.png)

![](http://i.imgur.com/smdCCc6.png)



# Idea 💡

I want to build a search engine similar to [DuckDuckGo](https://duckduckgo.com/) but instead of providing a static set of links, I provide a mind map of best of the best peer reviewed resources one can use to learn each of the topics.

It's purpose is to let users query [the big mind map of knowledge](https://github.com/nikitavoloboev/knowledge-map) and receive visual mind maps that one can explore with links, videos, articles, gifs that help learn the subject at hand. 

You can already [search and find the mind maps in a fast interface with Alfred](http://quick.as/b1gwsneao) with an [Alfred workflow](https://github.com/nikitavoloboev/alfred-knowledge-map). However the web search engine will be a lot more powerful than that and accept many more queries and be available for all.

As I wish for this to be a community project where everyone can add their resource that they have found or made, I want this project to be fully open source.

The search engine index is fully transparent and can be seen [here](https://github.com/nikitavoloboev/knowledge-map). It should cover any one topic one may want to learn from learning 'calculus' to learning about 'neural networks' and it would provide a visual overview of how to fully acquire this knowledge in the most efficient way possible as well as show how every topic that you are trying to learn connects. 

As all the mind maps are avaialble for all to see, anyone can come in and propose changes to it, however links and resources should be of high quality. The focus of this search engine is not to index everything there exists like what conventional search engines do, instead it should provide visual 'human reviewed' links and resources and ideally provide resources for learning in a 'step by step' manner similar to what can be seen [here](https://github.com/nikitavoloboev/knowledge-map/tree/master/study-plans).

# Help 👬

If you find this idea interesting and you want to help, you can join our [slack group](https://knowledge-map.slack.com/shared_invite/MTgxNTYzMjIzNjM5LTE0OTQzMzA4MDAtYzY1YWY0ZDc0NQ). I would really love to work together as this project is something I have always wished would exist.

## Search Engine Syntax 🔎

The search engine will have a limited set of keywords that you can use. Fortunately the search will be powered by strong autocomplete so all users will know what is available for them to search. The search will essentially jump to the correct place in any of mind maps from [knowledge map](https://github.com/nikitavoloboev/knowledge-map). 

There will be a list of prefixes that will be available that users can use to better their query. 

Here is a rough list of what queries and prefixes will be implemented in the future (where .. stands for user's input) :

- 'learn ..' = a step by step guide or just resources will be provided on how to learn the topic in depth (users can also pan around the mind map to see how the topic connects to other pieces of knowledge)
	- i.e. 'learn computer science' will show [such mind map](https://my.mindnode.com/QKWtVCHyuwbZnuxdtzZhXxs4wp8St7GeiLbKMzQU#773.1,-259.1,5)
- 'research papers on ..' will show research papers relavant to the topic (with links to annotations and notes if such are available)
	- i.e. 'research papers on machine learning' will show [this](https://my.mindnode.com/KnxHHqeyGXr5Z7BcYAyFbY3z7dpQawANPytSfLi3#-1399.9,-982.3,5)
- 'books on ..' will show books on any subject
	- i.e. 'books on computer networking' will show [this](https://my.mindnode.com/anrzuAWyaqWFjRwrp7aapQLtb9PPhBxhWny9VaQr#435.7,7312.2,4)
- 'interesting youtube channels for ..' will show youtube channels related to some topic
	- i.e. 'interesting youtube channels for learning' = will show [this](https://my.mindnode.com/piRNM8PKy63o8mfspx8pXa2n2PEaBgF7BfhguJqs#-611.8,-1217.7,3)
- 'courses on ..' will show good courses you can take on any of the subjects
	- i.e. 'courses on deep learning' will show [this](https://my.mindnode.com/f2sAoGJN9psymLPwcM2ohf1KwaH3rqxDBtB4psR4#19.8,-982.7,5)
- 'interesting blogs on ..' will show various great blogs that write about that subject 
	- i.e. 'interesting blogs on mathematics' will show [this](https://my.mindnode.com/Lr33AxQg1yTrPzYJrAbFD7E6Wr7cM6YyoUfXaEzp#483.2,-2139.7,7)

This list can go on of course as more quality content gets added and mapped. Which should be possible as [everyone can contribute](https://github.com/nikitavoloboev/knowledge-map#contributing-) to what shows up in these mind maps. 

