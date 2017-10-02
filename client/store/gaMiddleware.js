import actions from 'constants/actions.json';

const getGAObj = (action) => {
  const type = action.type.replace(/(\[.*\])|\*.*/g, '');

  switch (action.type) {
    case actions.map.fetch.fulfilled:
      return {
        eventCategory: 'Search',
        eventAction: type,
        eventLabel: action.payload.data.title,
      };

    case actions.ga.navigation.internal:
    case actions.ga.navigation.external:
      return {
        eventCategory: 'Navigation',
        eventAction: type,
        eventLabel: action.payload,
      };

    case actions.ga.contribution.buttonClicked:
    case actions.ga.contribution.guidelinesAccepted:
      return {
        eventCategory: 'Contribution',
        eventAction: type,
        eventLabel: action.payload,
      };

    case actions.ga.search.unmatchedQuery:
    case actions.ga.search.fallbackSearch:
      return {
        eventCategory: 'Search',
        eventAction: type,
        eventLabel: action.payload,
      };

    default:
      return {};
  }
};

const prod = GAObj => ga('send', 'event', GAObj);
// eslint-disable-next-line no-console
const dev = GAObj => console.log(GAObj);

export default () => next => (action) => {
  const GAObj = getGAObj(action);

  // If there's no event category.
  if (!GAObj.eventCategory) {
    return next(action);
  }

  if (process.env.NODE_ENV === 'production') {
    prod(GAObj);
  } else {
    dev(GAObj);
  }

  return next(action);
};
