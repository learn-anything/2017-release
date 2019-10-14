import actions from 'constants/actions.json';

export const showSearchbar = () => ({
  type: actions.header.showSearchbar,
});

export const hideSearchbar = () => ({
  type: actions.header.hideSearchbar,
});
