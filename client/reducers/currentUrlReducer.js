import actions from '../strings/actions.json';

export default (state = '', action) => {
  switch (action.type) {
    case actions.map.fetch.def:
      return window.location.href;
    default:
      return state;
  }
};

