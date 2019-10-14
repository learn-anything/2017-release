const mdfile = require('../utils').mdfile;
const md = require('../utils').md;

module.exports = {
  // Help
  welcome_text: md(
    'Welcome to Learn Anything, the platform for knowledge discovery that helps you understand any topic through the **most efficient** paths, as voted by the community.'
  ),
  searchbar_help_text_0:
    'Start your search by typing a topic in the bar above.',
  searchbar_help_text_1: 'Or, ',
  searchbar_help_text_anything: 'click here to browse all topics',

  // Dialog
  dialog_cancel: 'Cancel',
  dialog_done: 'Done',

  // Contribute button
  contribute_button_text: 'Improve Map',
  contribute_button_text_editing: 'Done',
  contribute_add_resource: 'Add a new resource',

  // New resource
  new_resource_add_resource: 'Add resource',
  new_resource_name: 'name',
  new_resource_category: 'category',
  new_resource_url: 'url',

  // Searchbar
  searchbar_nodes_count: 'nodes',
  searchbar_new_search: 'Start new Search',
  searchbar_suggestions_title: 'suggestions',
  first_search_title: 'I want to learn',

  // Sidebar
  sidebar_login: 'Login',
  sidebar_logout: 'Logout',
  sidebar_home: 'Home',
  sidebar_all_topics: 'All topics',
  sidebar_support: 'Support',
  sidebar_about: 'About',
  sidebar_twitter: 'Twitter',
  sidebar_patreon: 'Patreon',
  sidebar_github: 'GitHub',
  sidebar_legend: 'Legend',
  sidebar_lists: 'Curated lists',

  // About
  about: mdfile('about', 'en'),

  // Legend
  legend: mdfile('legend', 'en'),
  legend_title: 'Legend',

  // Breadcrumbs
  breadcrumbs_mobile_path: 'path:',

  // Map
  unauthorized_dialog: mdfile('unauthorized', 'en'),
  node_resources: 'Resources',
  resources_show_more: 'Show {} More',
};
