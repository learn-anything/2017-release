/*
 * Get an object with classNames as keys and expressions as values.
 *
 * If the values are functions they're gonna be run, otherwise they're gonna
 * be casted to boolean.
 *
 * The booleans represent wether or not a class should be present
 * on the final string.
 */
export default classNames =>
  Object.keys(classNames)
    .filter((className) => {
      if (typeof classNames[classNames] === 'function') {
        return classNames[className]();
      }

      return classNames[className];
    })
    .join(' ');
