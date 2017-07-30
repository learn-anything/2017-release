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
export const cleanTitle = title => title.replace('learn anything - ', '');

// "path - to map" -> "/learn-anything/path/to-map"
export const cleanTitleToAbsURL = (title) => {
  let url = titleToURL(title);

  if (!url.startsWith('learn-anything')) {
    url = `/learn-anything${url}`;
  }

  return url;
};
