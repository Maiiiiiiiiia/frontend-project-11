import onChange from 'on-change';
import render from './view';
import i18next from 'i18next';
import resources from './locales/index';
import axios, { AxiosError } from 'axios';
import parser from './parser';
import validateUrl from './validateUrl';



const app = () => {
  const state = {
    link: [],
    form: {
      isValid: null,
      formState: '',
    },
    validLinks: [],
    content: [],
    errorMessage: '',
  };

  const i18nInstance = i18next.createInstance();
  const gettingInstance = i18nInstance;
  gettingInstance.init({
  lng: 'ru',
  debug: false,
  resources,
  });

  const watchedState = onChange(state, (path, value) => {
    render(value, state, i18nInstance.t);
  });

  const form = document.querySelector('.rss-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');

    validateUrl(url, state.validLinks)
      .then(() => watchedState.form.formState = 'filling')
      .then(() => watchedState.link.push(url))
      .then(() => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`))
      .then((response) => {
        const data = parser(response);
        // console.log(data); // тут объект с данными
        if (data === null) {
          throw i18nInstance.t('feedback.invalidRss');
        }
        watchedState.content.push(data);
        // console.log(state.content); // тут массив с объектами state.content

        watchedState.validLinks.push(url);
      })
  });

  const updater = () => {
    setTimeout(() => {
      watchedState.form.formState = 'update';
      updater();
    }, 500000);
  };
  updater();
};

export default app;
