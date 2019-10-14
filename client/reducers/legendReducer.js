import actions from 'constants/actions.json';


const initialState = {
  isVisible: false,
};


export default (state = initialState, action) => {
  switch (action.type) {
    case actions.legend.show:
      return {
        isVisible: true,
      };

    case actions.legend.hide:
      return {
        isVisible: false,
      };

    default:
      return state;
  }
};
