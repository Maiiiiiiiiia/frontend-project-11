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

const createContainerPost = (response, value, i18n) => {
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
  } if (value === 'update') {
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
export default createContainerPost;
