// eslint-disable-next-line no-undef
const containerResult = document.getElementById('result');
// eslint-disable-next-line no-undef
const value = document.getElementById('add-input');
// eslint-disable-next-line no-undef
const search = document.getElementById('add-button');
// for create elements
const createElements = (tag, name, parent, className) => {
  // eslint-disable-next-line no-undef
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
// eslint-disable-next-line consistent-return
search.addEventListener('click', (e) => {
  e.preventDefault();
  deleteChild(containerResult);
  const newValue = value.value.trim();
  // eslint-disable-next-line no-undef
  if (!(newValue)) {
    createElements('p', 'Please Write On The Feild Search', containerResult, 'error');
    return '';
  }
  // eslint-disable-next-line no-undef
  request('/search', 'POST', newValue, (error, response) => {
    if (error) {
      createElements('p', error, containerResult, 'error');
    } else {
      const advices = JSON.parse(response);
      // eslint-disable-next-line no-undef
      if (findMessage(advices)) {
        // eslint-disable-next-line no-undef
        createElements('p', getMessage(advices), containerResult, 'error');
      } else {
        // eslint-disable-next-line no-undef
        getAdvice(advices).forEach((slip) => {
          const searchItem = createElements('div', '', containerResult, 'resultSearch');
          createElements('p', 'Advice', searchItem, 'title_advice');
          // eslint-disable-next-line no-undef
          createElements('p', getSlips(slip), searchItem, 'advice_text');
        });
      }
    }
  });
});
