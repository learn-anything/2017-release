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
};
