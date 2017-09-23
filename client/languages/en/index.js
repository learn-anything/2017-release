const mdfile = require('../utils').mdfile;
const md = require('../utils').md;

module.exports = {
  // Help
  welcome_text: md('Welcome to Learn Anything, the platform for knowledge discovery that helps you understand any topic through the **most efficient** paths, as voted by the community.'),
  searchbar_help_text: md('Start your search by typing a topic in the bar above<br>Alternatively, [click here to browse all topics](/learn-anything)'),

  // Generic dialog
  dialog_cancel: 'Cancel',
  dialog_okay: 'Okay',

  // Unmatched dialog
  unmatched_dialog_title: 'Map not found',
  unmatched_dialog_message: `The topic you're looking for doesn't have a map yet, but you can search it on DuckDuckGo.`,
  unmatched_dialog_accept_label: 'Search',

  // Contribute dialog
  contribute_dialog_title: 'Contribution guidelines',
  contribute_dialog_message: mdfile('guidelines', 'en'),
  contribute_dialog_accept_label: 'Continue',

  // Contribute button
  contribute_button_text: 'Improve this map',

  // Searchbar
  searchbar_nodes_count: 'nodes',
  first_search_title: 'I want to learn',

  // Sidebar
  sidebar_home: 'Home',
  sidebar_support: 'Support',
  sidebar_about: 'About',
  sidebar_github: 'Github',
};
