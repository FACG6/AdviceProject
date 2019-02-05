const request = (url, method, value, cb) => {
  // eslint-disable-next-line no-undef
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      const response = JSON.parse(xhr.responseText);
      if (xhr.status === 200) {
        if (response.error) {
          cb(new TypeError(response.error));
        } else {
          cb(null, JSON.parse(response.results));
        }
      } else {
        cb(new TypeError(response.error));
      }
    }
  };
  xhr.open(method, url);
  xhr.send(value);
};
if (module) {
  module.exports = request;
}
