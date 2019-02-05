const fs = require('fs');
const path = require('path');
const requestApi = require('request');

const handelHome = (request, response) => {
  const pathFile = path.join(__dirname, '..', 'public', 'index.html');
  fs.readFile(pathFile, (error, file) => {
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
  fs.readFile(pathFile, (error, file) => {
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
    requestApi(options, (error, res, body) => {
      if (error) {
        response.writeHead(500, {
          'content-type': 'text/html',
        });
        response.end('<h1>Internal Server Error</h1>');
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
};
