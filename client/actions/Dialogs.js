import actions from 'constants/actions.json';


export const setAboutVisibility = visibility => ({
  type: actions.dialogs.about.setVisibility,
  payload: visibility,
});

export const setLegendVisibility = visibility => ({
  type: actions.dialogs.legend.setVisibility,
  payload: visibility,
});
