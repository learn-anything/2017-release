const readFileSync = require('fs').readFileSync;
const marked = require('marked');

/*
 * Parse a Markdown string to HMTL.
 */
const md = text => marked(text);

/*
 * Read Markdown from ./{lang}/{filename}.md and parse it to HTML.
 */
const mdfile = (filename, lang) => {
  const path = `${__dirname}/${lang}/${filename}.md`;
  const content = readFileSync(path, 'utf8');

  return marked(content);
}

module.exports = { mdfile, md };
