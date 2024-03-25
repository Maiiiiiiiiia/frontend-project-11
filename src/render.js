const feedback = document.querySelector('.feedback');
const inputText = document.querySelector('#url-input');
const sendButton = document.querySelector('[type="submit"]');

const createAndAppendElement = (parent, elementType, classes, content) => {
  const element = document.createElement(elementType);
  classes.forEach((className) => {
    element.classList.add(className);
  });
  if (content) {
    element.textContent = content;
  }
  parent.append(element);
  return element;
};

export const renderLoading = () => {
  sendButton.disabled = true;
  feedback.classList.remove('text-danger', 'text-success', 'is-invalid');
  feedback.textContent = '';
};

export const createContainerPost = (response, i18n, value) => {
  let items;
  if (value === 'loading') {
    renderLoading();
    return null;
  }
  if (value === 'filling') {
    const data = response[response.length - 1];
    items = data.posts.reverse();
    const postsContainer = document.querySelector('.posts');
    const feedsContainer = document.querySelector('.feeds');
    if (!postsContainer.hasChildNodes()) {
      const divCardBorder = createAndAppendElement(postsContainer, 'div', ['card', 'border-0']);
      const divFeeds = createAndAppendElement(feedsContainer, 'div', ['card', 'border-0']);
      const divCardBody = createAndAppendElement(divCardBorder, 'div', ['card-body']);
      const divCard = createAndAppendElement(divFeeds, 'div', ['card-body']);
      const ulFeeds = createAndAppendElement(divFeeds, 'ul', ['list-group', 'border-0', 'rounded-0']);
      createAndAppendElement(divCardBody, 'h2', ['card-title', 'h4'], i18n('items.posts'));
      createAndAppendElement(divCard, 'h2', ['card-title', 'h4'], i18n('items.feeds'));
      createAndAppendElement(divCardBorder, 'ul', ['list-group', 'border-0', 'rounded-0']);
      createAndAppendElement(divFeeds, 'ul', ['list-group', 'border-0', 'rounded-0']);
      const { mainTitle } = data;
      const { mainDescription } = data;
      const li = createAndAppendElement(ulFeeds, 'li', ['list-group-item', 'border-0', 'border-end-0']);
      createAndAppendElement(li, 'h3', ['h6', 'm-0'], mainTitle);
      createAndAppendElement(li, 'p', ['m-0', 'small', 'text-black-50'], mainDescription);
    } else {
      const { mainTitle } = data;
      const { mainDescription } = data;
      const ulFeeds = document.querySelector('.feeds > .card > .list-group');
      const li = createAndAppendElement(ulFeeds, 'li', ['list-group-item', 'border-0', 'border-end-0']);
      createAndAppendElement(li, 'h3', ['h6', 'm-0'], mainTitle);
      createAndAppendElement(li, 'p', ['m-0', 'small', 'text-black-50'], mainDescription);
    }
  }
  if (value === 'update') {
    items = response[response.length - 1].reverse();
  }
  const ulPost = document.querySelector('.posts > .card > .list-group');
  items.forEach((item) => {
    const { title } = item;
    const { href } = item;
    const { id } = item;
    const li = createAndAppendElement(ulPost, 'li', ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0']);
    const a = createAndAppendElement(li, 'a', ['fw-bold'], title);
    a.setAttribute('href', href);
    a.setAttribute('data-id', id);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    const button = createAndAppendElement(li, 'button', ['btn', 'btn-outline-primary', 'btn-sm'], i18n('buttons.view'));
    button.setAttribute('type', 'button');
    button.setAttribute('data-id', id);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    ulPost.prepend(li);
    return null;
  });
};

export const renderFilling = (state, i18n, value) => {
  sendButton.disabled = true;
  feedback.classList.remove('text-danger', 'text-success', 'is-invalid');
  feedback.textContent = '';

  if (inputText.classList.contains('is-invalid')) {
    inputText.classList.remove('is-invalid');
  }
  feedback.classList.add('text-success');
  feedback.textContent = i18n('feedback.success');
  createContainerPost(state.content, i18n, value);
  inputText.value = '';
  inputText.focus();
  sendButton.removeAttribute('disabled');
};

export const renderError = (errorText) => { // Error: Ресурс не содержит валидный RSS
  console.log(errorText);
  sendButton.removeAttribute('disabled');
  if (!inputText.classList.contains('is-invalid')) {
    inputText.classList.add('is-invalid');
  }
  feedback.classList.add('text-danger');
  const errorKey = `${errorText}`;
  if (errorKey) {
    const [, result] = errorKey.split(': ');

    feedback.textContent = result;
  }
};

export const renderClick = (state) => {
  const idClickLink = state.clickedLinks;
  idClickLink.forEach((id) => {
    const postElement = document.querySelector(`a[data-id="${id}"]`);
    postElement.classList.add('fw-normal', 'link-secondary');
    postElement.classList.remove('fw-bold');
  });
  const response = state.content;
  const data = response[response.length - 1];
  const items = data.posts;
  items.forEach((item) => {
    const { title } = item;
    const { href } = item;
    const { description } = item;
    document.querySelector('.modal-header > h5').textContent = title;
    document.querySelector('.modal-content > .modal-body').textContent = description;
    document.querySelector('.modal-footer > a').setAttribute('href', href);
  });
};
