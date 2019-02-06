const containerResult = document.getElementById('result');
const value = document.getElementById('add-input');
const search = document.getElementById('add-button');
// for create elements
const createElements = (tag, name, parent, className) => {
  const newElement = document.createElement(tag);
  newElement.classList.add(className);
  if (tag === 'img') {
    newElement.src = name;
  } else {
    newElement.textContent = name;
  }
  parent.appendChild(newElement);
  return newElement;
};
// for delete all child in specific div
const deleteChild = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};
// make random advice
request('/random', 'GET', null, (error, response) => {
  if (error) {
    createElements('p', error, containerResult, 'error');
  } else {
    const searchItem = createElements('div', '', containerResult, 'resultSearch');
    createElements('p', ' Random Advice :) ', searchItem, 'title_advice');
    createElements('p', getSlips(JSON.parse(response).slip), searchItem, 'advice_text');
  }
});
search.addEventListener('click', (e) => {
  e.preventDefault();
  deleteChild(containerResult);
  const newValue = value.value.trim();
  if (!(newValue)) {
    createElements('p', 'Please Write On The Feild Search', containerResult, 'error');
    return '';
  }
  request('/search', 'POST', newValue, (error, response) => {
    if (error) {
      createElements('p', error, containerResult, 'error');
    } else {
      const advices = JSON.parse(response);
      if (findMessage(advices)) {
        createElements('p', getMessage(advices), containerResult, 'error');
      } else {
        getAdvice(advices).forEach((slip) => {
          const searchItem = createElements('div', '', containerResult, 'resultSearch');
          createElements('p', 'Advice', searchItem, 'title_advice');
          createElements('p', getSlips(slip), searchItem, 'advice_text');
        });
      }
    }
  });
});
