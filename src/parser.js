import uniqueId from 'lodash/uniqueId';
// import renderError from './render';
import { renderError } from './render';

const parser = (response, i18n) => {
  const feedback = document.querySelector('.feedback');
  const sendButton = document.querySelector('[type="submit"]');

  const pars = new DOMParser();
  const doc = pars.parseFromString(response.data.contents, 'text/xml');
  if (!doc.querySelector('rss')) {
    const errorMessage = i18n('feedback.invalidRss');
    renderError(new Error(errorMessage)); // Error: Ресурс не содержит валидный RSS
    return null;
  }

    const items = doc.querySelectorAll('item');
    const mainTitle = doc.querySelector('channel > title').textContent;
    const mainDescription = doc.querySelector('channel > description').textContent;
    const data = { mainTitle, mainDescription, posts: [] };
    items.forEach((item) => {
      const id = uniqueId();
      const title = item.querySelector('title').textContent;
      const href = item.querySelector('link').textContent;
      const description = item.querySelector('description').textContent;
      data.posts.push({
        title, description, href, id,
      });
    });
    return data;
};
export default parser;
