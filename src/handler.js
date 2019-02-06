const path = require('path');
const requestModule = require('./requestModule');
const readFiles = require('./readFiles');

const handelHome = (request, response) => {
  const pathFile = path.join(__dirname, '..', 'public', 'index.html');
  readFiles(pathFile, (error, file) => {
    if (error) {
      response.writeHead(500, {
        'content-type': 'text/html',
      });
      response.end('<h1>Internal Server Error</h1>');
    } else {
      response.writeHead(200, {
        'content-type': 'text/html',
      });
      response.end(file);
    }
  });
};
const handelServepages = (request, response) => {
  const endpoint = request.url;
  const extantion = path.extname(endpoint).substr(1);
  const filePath = endpoint.split('/');
  const pathFile = path.join(__dirname, '..', ...filePath);
  const contantType = {
    html: 'text/html',
    css: 'text/css',
    js: 'text/javascript',
    json: 'application/json',
  };
  readFiles(pathFile, (error, file) => {
    if (error) {
      response.writeHead(500, {
        'content-type': 'text/html',
      });
      response.end('<h1>Internal Server Error</h1>');
    } else {
      response.writeHead(200, {
        'content-type': contantType[extantion],
      });
      response.end(file);
    }
  });
};
const handelSearch = (request, response) => {
  let allData = '';
  request.on('data', (chunk) => {
    allData += chunk;
  });
  request.on('end', () => {
    const options = {
      method: 'GET',
      url: `https://api.adviceslip.com/advice/search/${allData}`,
    };
    requestModule(options, (error, body) => {
      if (error) {
        response.writeHead(500, {
          'content-type': 'text/html',
        });
        response.end(error.message);
      } else {
        response.writeHead(200, {
          'content-type': 'application/json',
        });

        const reponseFile = {
          error: null,
          results: JSON.stringify(body),
        };
        response.end(JSON.stringify(reponseFile));
      }
    });
  });
};
const handelRandom = (request, response) => {
  const options = {
    method: 'GET',
    url: 'https://api.adviceslip.com/advice',
  };
  requestModule(options, (error, body) => {
    if (error) {
      response.writeHead(500, {
        'content-type': 'text/html',
      });
      response.end(error.message);
    } else {
      response.writeHead(200, {
        'content-type': 'application/json',
      });

      const reponseFile = {
        error: null,
        results: JSON.stringify(body),
      };
      response.end(JSON.stringify(reponseFile));
    }
  });
};
const handelNotFound = (request, response) => {
  response.writeHead(404, {
    'content-type': 'text/html',
  });
  response.end('<h1>Page Not Found </h1>');
};
module.exports = {
  handelHome,
  handelNotFound,
  handelSearch,
  handelServepages,
  handelRandom,
};
