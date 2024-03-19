import axios, { AxiosError } from 'axios';
import parser from './parser';
import builtUpdate from './builtUpdate';

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

const createContainerPost = (response, i18n, value) => {
  let items;
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
      // const { href } = data;
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
    items = response;
  }
  const ulPost = document.querySelector('.posts > .card > .list-group');
  items.map((item) => {
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

const checkNewPost = (state, i18n, value) => {
  state.validLinks.map((link) => {
    axios
      .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`)
      .then((response) => {
        const data = parser(response);
        const difference = builtUpdate(data, state.content);
        if (difference.length !== 0) {
          createContainerPost(difference, i18n, value);
          const mainContent = state.content.filter((item) => item.mainTitle === data.mainTitle);
          difference.map((post) => mainContent[0].posts.push(post));
        }
      })
      .catch(() => {});
    return null;
  });
  setTimeout(() => checkNewPost(state, i18n, value), 5000);
};

export const render = (state, value, i18n) => {
  if (value === 'loading') {
    sendButton.disabled = true;
    feedback.classList.remove('text-danger', 'text-success', 'is-invalid');
    feedback.textContent = '';
  }
  if (value === 'filling') {
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
  }
  if (value === 'error') {
    sendButton.removeAttribute('disabled');
    if (!inputText.classList.contains('is-invalid')) {
      inputText.classList.add('is-invalid');
    }
    feedback.classList.add('text-danger');
    const error = `${state.errorMessage}`;
    if (state.errorMessage instanceof AxiosError) {
      feedback.textContent = i18n('feedback.axiosError');
    } else if (error.includes('ValidationError: ')) {
      const [, result] = error.split('ValidationError: ');
      feedback.textContent = result;
    } else {
      feedback.textContent = error;
    }
  }
  if (value === 'update') {
    if (state.validLinks.length !== 0) {
      checkNewPost(state, i18n, value);
      // createContainerPost(state.content, i18n, value);
    }
  }
};
// export render;

export const renderClick = (state) => {
  const response = state.content;
  const data = response[response.length - 1];
  const items = data.posts;
  items.forEach((item) => {
    const { title } = item;
    const { href } = item;
    const { description } = item;
    const a = document.querySelector('.list-group-item > a');
    if (state.button === 'a') {
      a.classList.remove('fw-bold');
      a.classList.add('fw-normal', 'link-secondary');
    }
    if (state.button === 'button') {
      a.classList.remove('fw-bold');
      a.classList.add('fw-normal', 'link-secondary');
      document.querySelector('.modal-header > h5').textContent = title;
      document.querySelector('.modal-content > .modal-body').textContent = description;
      document.querySelector('.modal-footer > a').setAttribute('href', href);
    }
  });
};
export default renderClick;
