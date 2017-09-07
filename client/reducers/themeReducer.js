import actions from 'constants/actions.json';


const initialState = localStorage.getItem('theme') || 'PearlWhite';


export default (state = initialState, action) => {
  switch (action.type) {
    case actions.theme.set:
      localStorage.setItem('theme', action.payload);
      return action.payload;

    default:
      return state;
  }
};
