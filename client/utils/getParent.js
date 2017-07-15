// Return the parent node of an element (or the element) with a specific tag.
export default (el, tag) => {
  let node = el;

  while (node !== null) {
    if (node.tagName === tag) {
      return node;
    }
    node = node.parentElement;
  }

  return undefined;
};
