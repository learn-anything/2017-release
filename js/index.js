// TODO: user writes query, iframe is presented from below switch case, if query matches
function presentMindMap(query) {

}

search_input = document.getElementById("search").value

document.getElementById("search").value = "I want to learn ..";

// TODO: add autosuggestions to search bar so users can see what results are available, perhaps there is a library for that

// NOTE: queries can be prefixed by certain words to scope what the search is about
// i.e. if query is 'learn machine learning', mind map from 'learn anything' is shown
// if query is 'learn neural networks', mind map from 'learn anything - machine learning' is shown focused just on the 'neural networks' part
// other prexises may include 'interesting', i.e. 'interesting blogs on javascript' or 'interesting websites on education'
// list of prefixes to implement:
// - 'research papers on ..'
// - 'books on ..'
// - 'interesting youtube channels on ..'
// - 'courses on ..'
// list can go on

// NOTE: it would be awesome to also include curated image albums search
// so user can search for 'images of ..' and curated album of best images opens (although may require to open as new imgur link)
// should focus on mind maps first!

// TODO: add footer text displaying that mind map can be improved if user disagrees with contents of it

// TODO: if user enters a query for something that is not in the database, it should apologise and inform the user how he can help contribute
// to add resources for the subject or provide an efficient study plan

// TODO: remove iframe when user starts typing a query again

// TODO: for now just to get something working, make a switch case of all possible mind maps

// TODO: add API so search can be made from some third party program

// TODO:  deploy to google cloud or aws (aws has first year free I believe)

// TODO: add infrastructure so third party mind maps can be supported too if they are of high quality
// NOTE: they should also be interactive with ability to scope to needed results

// TODO: add some kind of button or something that can be clicked to expand the full 'learn anything' mind map
// it should cover whole screen, but search bar should still be accesibly if user wants to write a query

// NOTE: if in the mind map, a hyperlink opens another mind map, it would be amazing to have it be opened on the same web page and not go to new web page

// TODO: the mind map given should have an option to full screen the result if user wants to explore it full and explore other parts
