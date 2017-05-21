/* Make a GET request to the specified url and call callback with JSON
 * response when done.
 */
export default (url, done) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE
        && typeof done === 'function') {
      done(JSON.parse(xhr.responseText));
    }
  };

  xhr.send();
};
