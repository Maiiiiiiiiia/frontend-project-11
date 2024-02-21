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

const validateUrl = (url, validLinks, i18nInstance) => {
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
    const datas = data.posts;
    const postsContainer = document.querySelector('.posts');

    if (!postsContainer.hasChildNodes()) {
      const divCardBorder = document.createElement('div');
      divCardBorder.classList.add('card', 'border-0');
      postsContainer.append(divCardBorder);
      const divCardBody = document.createElement('div');
      divCardBody.classList.add('card-body');
      divCardBorder.append(divCardBody);
      const h2 = document.createElement('h2');
      h2.classList.add('card-title', 'h4');
      h2.textContent = i18nInstance.t('items.posts');
      divCardBody.append(h2);
      const ul = document.createElement('ul');
      ul.setAttribute('class', 'list-group border-0 rounded-0');
      divCardBorder.append(ul);
      datas.forEach((item) => {
        // console.log(title);
        const { title } = item;
        const { href } = item;
        const { description } = item;
        const { id } = item;
        const li = document.createElement('li');
        li.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-start border-0 border-end-0');
        ul.append(li);
        const aLi = document.createElement('a');
        aLi.setAttribute('href', `${href}`);
        aLi.classList.add('fw-bold');
        aLi.setAttribute('data-id', '12');
        aLi.setAttribute('target', '_blank');
        aLi.setAttribute('rel', 'noopener noreferrer');
        aLi.textContent = title;

        const buttonLi = document.createElement('button');
        buttonLi.setAttribute('type', 'button');
        buttonLi.classList.add('btn', 'btn-outline-primary', 'btn-sm');
        buttonLi.setAttribute('data-id', '12');
        buttonLi.setAttribute('data-bs-toggle', 'modal');
        buttonLi.setAttribute('data-bs-target', '#modal');
        buttonLi.textContent = i18nInstance.t('buttons.view');
        li.append(aLi, buttonLi);

        buttonLi.addEventListener('click', (e) => {
          e.preventDefault();
          aLi.classList.remove('fw-bold');
          aLi.classList.add('fw-normal', 'link-secondary');
          document.querySelector('.modal-header > h5').textContent = title;
          document.querySelector('.modal-content > .modal-body').textContent = description;
          document.querySelector('.modal-footer > a').setAttribute('href', href);
        })
      });
    } else {
      const ulPosts = document.querySelector('.posts > .card > .list-group');

      datas.forEach(({ title }) => {
        // console.log(title);
        const li = document.createElement('li');
        li.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-start border-0 border-end-0');
        ulPosts.append(li);
        const aLi = document.createElement('a');
        aLi.setAttribute('href', `${title}`);
        aLi.classList.add('fw-bold');
        aLi.setAttribute('data-id', '12');
        aLi.setAttribute('target', '_blank');
        aLi.setAttribute('rel', 'noopener noreferrer');
        aLi.textContent = (title);
        const buttonLi = document.createElement('button');
        buttonLi.setAttribute('type', 'button');
        buttonLi.classList.add('btn', 'btn-outline-primary', 'btn-sm');
        buttonLi.setAttribute('data-id', '12');
        buttonLi.setAttribute('data-bs-toggle', 'modal');
        buttonLi.setAttribute('data-bs-target', '#modal');
        buttonLi.textContent = i18nInstance.t('buttons.view');
        li.append(aLi, buttonLi);
      });
    }
  } if (value === 'update') {
    const ulPost = document.querySelector('.posts > .card > .list-group');
    items = response;

    items.map(({ title }) => {
          console.log(title);
          const li = document.createElement('li');
          li.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-start border-0 border-end-0');

          const a = document.createElement('a');
          a.setAttribute('href', `${title}`);
          a.classList.add('fw-bold');
          a.setAttribute('data-id', '12');
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
          a.textContent = (title);

          const button = document.createElement('button');
          button.setAttribute('type', 'button');
          button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
          button.setAttribute('data-id', '12');
          button.setAttribute('data-bs-toggle', 'modal');
          button.setAttribute('data-bs-target', '#modal');
          button.textContent = i18nInstance.t('buttons.view');
          li.append(a, button);
          ulPost.append(li);
    });
  }
};

const feedback = document.querySelector('.feedback');
const inputText = document.querySelector('#url-input');
// const form = document.querySelector('.rss-form');
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
        // inputText.classList.remove('text-danger');
        // const item = state.content[0].mainTitle;
        // console.log(item);
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
          feedback.textContent = i18nInstance('feedback.axiosError');
        } else if (error.includes('ValidationError: ')) {
          const [, result] = error.split('ValidationError: ');
          feedback.textContent = result;
        } else {
          feedback.textContent = error;
        }
      });
  } if (value === 'update') {
    console.log('render 164 string => value === update');
    if (state.validLinks.length !== 0) {
      state.validLinks.map((link) => {
        axios
        .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`)
        .then((response) => {
          const data = parser(response);
          const difference = builtUpdate(data, state.content);
          console.log(state.content);
          console.log(difference);
          if (difference.length !== 0) {
            createContainerPost(difference, value);
            const mainContent = state.content.filter((item) => item.mainTitle === data.mainTitle);
            difference.map((post) => mainContent[0].posts.push(post));
          }
        })
        .catch(() => {});
        return null;
      })
    }
  }
};
export default render;
