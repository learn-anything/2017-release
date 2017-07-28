// "learn anything - path - to map" -> "/path/to-map"
export const titleToURL = (title) => {
  let url = `/${title}`;

  // Convert dashes to slashes, spaces to dashes, and remove learn-anything
  // from maps that are not the main map.
  url = url
    .replace(/ - /g, '/')
    .replace(/ /g, '-')
    .replace('learn-anything/', '');

  return url;
};

// "learn anything - path - to map" -> "path - to map"
export const cleanTitle = (title) => (title.replace('learn anything - ', ''));
