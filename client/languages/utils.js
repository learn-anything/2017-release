const readFileSync = require('fs').readFileSync;
const marked = require('marked');

/*
 * Read Markdown from ./{lang}/{filename}.md and parse it to HTML.
 */
const md = (filename, lang) => {
  const path = `${__dirname}/${lang}/${filename}.md`;
  const content = readFileSync(path, 'utf8');

  return marked(content);
}

module.exports = { md };
