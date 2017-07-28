import actions from '../strings/actions.json';


const initialState = 'PearlWhite';


export default (state = initialState, action) => {
  switch (action.type) {
    case actions.theme.set:
      localStorage.setItem('theme', action.payload);
      return action.payload;

    default:
      return state;
  }
};
