/* eslint-disable  no-console */
import actions from 'constants/actions.json';

const getGAObj = (action) => {
  const type = action.type.replace(/(\[.*\])|\*.*/g, '');

  switch (action.type) {
    case actions.ga.navigation.internal:
    case actions.ga.navigation.external:
      return {
        eventName: type,
        eventCategory: 'Navigation',
        eventLabel: action.payload,
      };

    case actions.ga.search.unmatchedQuery:
    case actions.ga.search.fallbackSearch:
      return {
        eventName: type,
        eventCategory: 'Search',
        eventLabel: action.payload,
      };

    case actions.ga.contribution.improveMap:
    case actions.ga.contribution.createResource:
      return {
        eventName: type,
        eventCategory: 'Contribution',
        eventLabel: action.payload,
      };

    case actions.ga.pageview:
      return {
        pagePath: action.payload,
      };

    default:
      return {};
  }
};

const prod = (GAObj) => {
  if (GAObj.pagePath) {
    gtag('config', 'UA-74470910-2', { page_path: GAObj.pagePath });
    return;
  }

  gtag('event', GAObj.eventName, {
    event_category: GAObj.eventCategory,
    event_label: GAObj.eventLabel,
  });
};

const dev = (GAObj) => {
  if (GAObj.pagePath) {
    console.groupCollapsed('[GA] Pageview');
    console.log(GAObj.pagePath);
    console.groupEnd();
    return;
  }

  console.groupCollapsed('[GA] Event:', GAObj.eventName);
  console.log('event_category:', GAObj.eventCategory);
  console.log('event_label:', GAObj.eventLabel);
  console.groupEnd();
};

export default () => next => (action) => {
  const GAObj = getGAObj(action);

  // If there's no event category.
  if (!GAObj.eventCategory && !GAObj.pagePath) {
    return next(action);
  }

  if (process.env.NODE_ENV === 'production') {
    prod(GAObj);
  } else {
    dev(GAObj);
  }

  return next(action);
};
