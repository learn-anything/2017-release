const categoryToIconName = {
  'free book': 'free-book',
  'non-free book': 'non-free-book',
  'stack exchange': 'stack',
  article: 'article',
  blog: 'article',
  chat: 'chat',
  course: 'course',
  github: 'github',
  image: 'images',
  interactive: 'interactive',
  mindmap: 'arrow',
  newsletter: 'newsletter',
  other: 'other',
  paper: 'research',
  podcast: 'podcast',
  quora: 'quora',
  reddit: 'reddit',
  undefined: 'other',
  video: 'video',
  wiki: 'wiki',
  youtube: 'video',
};

export default category => (
  `/static/icons/${categoryToIconName[category]}.svg`
);
