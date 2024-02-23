import i18next from 'i18next';
import axios, { AxiosError } from 'axios';
import * as Yup from 'yup';
import resources from './locales/index';
import parser from './parser';
import builtUpdate from './builtUpdate';

const i18nInstance = i18next.createInstance();
const gettingInstance = i18nInstance;
gettingInstance.init({
  lng: 'ru',
  debug: false,
  resources,
});

const validateUrl = (url, validLinks) => {
  Yup.setLocale({
    mixed: {
      notOneOf: i18nInstance.t('feedback.duplicate'),
      required: i18nInstance.t('feedback.empty'),
      default: i18nInstance.t('feedback.invalidUrl'),
    },
    string: {
      url: i18nInstance.t('feedback.invalidUrl'),
    },
  });
  const schema = Yup.string()
    .trim()
    .required()
    .url(i18nInstance.t('feedback.invalidUrl'))
    .notOneOf(validLinks, i18nInstance.t('feedback.duplicate'))
    .validate(url);
  return schema;
};

const createContainerPost = (response, value) => {
  let items;
  if (value === 'filling') {
    const data = response[response.length - 1];
    items = data.posts.reverse();
    const postsContainer = document.querySelector('.posts');
    const feedsContainer = document.querySelector('.feeds');

    if (!postsContainer.hasChildNodes()) {
      const divCardBorder = document.createElement('div');
      divCardBorder.classList.add('card', 'border-0');
      postsContainer.append(divCardBorder);

      const divFeeds = document.createElement('div');
      divFeeds.classList.add('card', 'border-0');
      feedsContainer.append(divFeeds);

      const divCardBody = document.createElement('div');
      divCardBody.classList.add('card-body');
      divCardBorder.append(divCardBody);

      const divCard = document.createElement('div');
      divCard.classList.add('card-body');
      const ulFeeds = document.createElement('ul');
      ulFeeds.classList.add('list-group', 'border-0', 'rounded-0');
      divFeeds.append(divCard, ulFeeds);

      const h2 = document.createElement('h2');
      h2.classList.add('card-title', 'h4');
      h2.textContent = i18nInstance.t('items.posts');
      divCardBody.append(h2);

      const h2Feeds = document.createElement('h2');
      h2Feeds.classList.add('card-title', 'h4');
      h2Feeds.textContent = i18nInstance.t('items.feeds');
      divCard.append(h2Feeds);
      const ul = document.createElement('ul');
      ul.setAttribute('class', 'list-group border-0 rounded-0');
      divCardBorder.append(ul);
      const ul2 = document.createElement('ul');
      ul2.setAttribute('class', 'list-group border-0 rounded-0');
      divFeeds.append(ul2);
      const { mainTitle } = data;
      const { mainDescription } = data;
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'border-0', 'border-end-0');
      ulFeeds.append(li);
      const h3 = document.createElement('h3');
      h3.classList.add('h6', 'm-0');
      h3.textContent = (mainTitle);
      const p = document.createElement('p');
      p.classList.add('m-0', 'small', 'text-black-50');
      p.textContent = (mainDescription);
      li.append(h3, p);
    } else {
      const { mainTitle } = data;
      const { mainDescription } = data;
      // console.log('else');
      const li = document.createElement('li');
      const ulFeeds = document.querySelector('.feeds > .card > .list-group');

      li.classList.add('list-group-item', 'border-0', 'border-end-0');
      ulFeeds.prepend(li);

      const mainH = document.createElement('h3');
      mainH.classList.add('h6', 'm-0');
      mainH.textContent = mainTitle;
      li.append(mainH);
      const mainP = document.createElement('p');
      mainP.classList.add('m-0', 'small', 'text-black-50');
      mainP.textContent = mainDescription;
      li.append(mainP);
    }
  } if (value === 'update') {
    items = response;
  }
  const ulPost = document.querySelector('.posts > .card > .list-group');
  items.map((item) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-start border-0 border-end-0');
    const { title } = item;
    const { href } = item;
    const { description } = item;
    const { id } = item;
    const a = document.createElement('a');
    a.setAttribute('href', href);
    a.classList.add('fw-bold');
    a.setAttribute('data-id', id);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    a.textContent = title;
    a.addEventListener('click', () => {
      a.classList.remove('fw-bold');
      a.classList.add('fw-normal', 'link-secondary');
    });
    li.append(a);

    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('data-id', id);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.textContent = i18nInstance.t('buttons.view');
    button.addEventListener('click', (e) => {
      e.preventDefault();
      a.classList.remove('fw-bold');
      a.classList.add('fw-normal', 'link-secondary');
      document.querySelector('.modal-header > h5').textContent = title;
      document.querySelector('.modal-content > .modal-body').textContent = description;
      document.querySelector('.modal-footer > a').setAttribute('href', href);
    });
    li.append(button);
    ulPost.prepend(li);
    return null;
  });
};

const feedback = document.querySelector('.feedback');
const inputText = document.querySelector('#url-input');
const sendButton = document.querySelector('[type="submit"]');

const render = (value, state) => {
  state.form.formState = '';
  if (value === 'filling') {
    // state.validLinks.push(state.link);
    validateUrl(state.link, state.validLinks, i18nInstance)
      .then(() => {
        sendButton.disabled = true;
        feedback.classList.remove('text-danger', 'text-success', 'is-invalid');
        feedback.textContent = '';
      })
      .then(() => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(state.link)}`))
      .then((response) => {
        const data = parser(response);
        // console.log(data);
        if (data === null) {
          throw i18nInstance.t('feedback.invalidRss');
        }
        state.content.push(data);
      })
      .then(() => {
        state.validLinks.push(state.link);
        if (inputText.classList.contains('is-invalid')) {
          inputText.classList.remove('is-invalid');
        }
        feedback.classList.add('text-success');
        feedback.textContent = i18nInstance.t('feedback.success');

        createContainerPost(state.content, value);
        inputText.value = '';
        inputText.focus();
        sendButton.removeAttribute('disabled');
      })
      .catch((err) => {
        sendButton.removeAttribute('disabled');
        if (!inputText.classList.contains('is-invalid')) {
          inputText.classList.add('is-invalid');
        }
        feedback.classList.add('text-danger');
        const error = `${err}`;
        if (err instanceof AxiosError) {
          feedback.textContent = i18nInstance.t('feedback.axiosError');
          console.log('error');
        } else if (error.includes('ValidationError: ')) {
          const [, result] = error.split('ValidationError: ');
          feedback.textContent = result;
        } else {
          feedback.textContent = error;
        }
      });
  } if (value === 'update') {
    // console.log('render 164 string => value === update');
    if (state.validLinks.length !== 0) {
      state.validLinks.map((link) => {
        axios
          .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`)
          .then((response) => {
            const data = parser(response);
            const difference = builtUpdate(data, state.content);
            // console.log(state.content);
            // console.log(difference);
            if (difference.length !== 0) {
              createContainerPost(difference, value);
              const mainContent = state.content.filter((item) => item.mainTitle === data.mainTitle);
              difference.map((post) => mainContent[0].posts.push(post));
            }
          })
          .catch(() => {});
        return null;
      });
    }
  }
};
export default render;
