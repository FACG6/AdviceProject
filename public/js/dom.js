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
search.addEventListener('click', (e) => {
  e.preventDefault();
  deleteChild(containerResult);
  const newValue = value.value.trim();
  // eslint-disable-next-line no-undef
  request('/search', 'POST', newValue, (error, response) => {
    if (error) {
      createElements('p', error, containerResult, 'error');
    } else {
      const advices = JSON.parse(response);
      if (advices.message) {
        const searchItem = createElements('div', '', containerResult, 'resultSearch');
        createElements('p', advices.message.text, searchItem, 'error');
      } else {
        advices.slips.forEach((slip) => {
          const searchItem = createElements('div', '', containerResult, 'resultSearch');
          createElements('p', slip.advice, searchItem, 'advice_text');
        });
      }
    }
  });
});
