import i18next from 'i18next';
import axios, { AxiosError } from 'axios';
import * as Yup from 'yup';
import resources from './locales/index';
import parser from './parser';

const createContainerPost = (response, i18nInstance, value) => {
  // let items;
  if (value === 'filling') {
    const data = response[response.length - 1];
    const datas = data.posts;
    const postsContainer = document.querySelector('.posts');
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
    datas.forEach(({title}) => {
      // console.log(title);
      const li = document.createElement('li');
      li.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-start border-0 border-end-0');
      ul.append(li);

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
};

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

const feedback = document.querySelector('.feedback');
const inputText = document.querySelector('#url-input');
// const form = document.querySelector('.rss-form');
const sendButton = document.querySelector('[type="submit"]');

const render = (value, state) => {
  // value === 'filling'
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
        createContainerPost(state.content, i18nInstance.t, value);
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
  }
};
export default render;
