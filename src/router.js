const {
  handelHome,
  handelNotFound,
  handelSearch,
  handelServepages,
} = require('./handler');

const router = (request, response) => {
  const endpoint = request.url;
  if (endpoint === '/') {
    handelHome(request, response);
  } else if (endpoint.includes('/public/')) {
    handelServepages(request, response);
  } else if (endpoint === '/search') {
    handelSearch(request, response);
  } else {
    handelNotFound(request, response);
  }
};

module.exports = router;
