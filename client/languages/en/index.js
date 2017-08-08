const md = require('../utils').md;

module.exports = {
  // Generic dialog
  dialog_cancel: 'Cancel',
  dialog_okay: 'Okay',

  // Unmatched dialog
  unmatched_dialog_title: 'Map not found',
  unmatched_dialog_message: `The topic you're looking for doesn't have a map yet, but you can search it on DuckDuckGo.`,
  unmatched_dialog_accept_label: 'Search',

  // Contribute dialog
  contribute_dialog_title: 'Contribution guidelines',
  contribute_dialog_message: md('guidelines', 'en'),
  contribute_dialog_accept_label: 'Continue',

  // Contribute button
  contribute_button_text: 'Improve this map',

  // Searchbar
  searchbar_help_text_0: 'Press Enter to open our randomly suggested map.',
  searchbar_help_text_1: 'Start writing to get a list of existing topics.',

  // Sidebar - Themes
  sidebar_themes_title: 'Themes 🖌',
  sidebar_themes_night: 'Night 🌃',
  sidebar_themes_white: 'Pearl White ⚪',

  // Sidebar - Tips
  sidebar_tips_title: 'Tips 💡',
  sidebar_tips_content: md('tips', 'en'),
};
