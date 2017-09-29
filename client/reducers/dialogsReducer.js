import actions from 'constants/actions.json';


const initialState = {
  about: false,
  legend: false,
};


export default (state = initialState, action) => {
  switch (action.type) {
    case actions.dialogs.about.setVisibility:
      return {
        ...state,
        about: action.payload,
      };

    case actions.dialogs.legend.setVisibility:
      return {
        ...state,
        legend: action.payload,
      };

    default:
      return state;
  }
};
