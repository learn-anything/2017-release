import actions from 'constants/actions.json';

export const showLegend = () => ({
  type: actions.legend.show,
});

export const hideLegend = () => ({
  type: actions.legend.hide,
});
