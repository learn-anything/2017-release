const categoryToIconName = {
  mindmap: 'arrow',
  wiki: 'wiki',
  'stack exchange': 'stack',
  course: 'course',
  'free book': 'free-book',
  'non-free book': 'non-free-book',
  paper: 'research',
  video: 'video',
  article: 'article',
  blog: 'article',
  github: 'github',
  interactive: 'interactive',
  image: 'images',
  podcast: 'podcast',
  newsletter: 'newsletter',
  chat: 'chat',
  youtube: 'video',
  reddit: 'reddit',
  quora: 'quora',
  other: 'other',
  undefined: 'other',
};

export default category => (
  `/static/icons/${categoryToIconName[category]}.svg`
);
