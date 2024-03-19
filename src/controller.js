import onChange from 'on-change';
import i18next from 'i18next';
import axios from 'axios';
import resources from './locales/index';
import validateUrl from './validateUrl';
import parser from './parser';
import { render, renderClick } from './render';

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
    button: '',
    feedback: '',
  };

  const i18nInstance = i18next.createInstance();
  const gettingInstance = i18nInstance;
  gettingInstance.init({
    lng: 'ru',
    debug: false,
    resources,
  }).then(() => {
    const watchedState = onChange(state, (path, value) => {
      switch (path) {
        case 'form.formState':
          render(state, value, i18nInstance.t);
          break;
        case 'button':
          renderClick(state);
          break;
        default:
          break;
      }
    });

    const form = document.querySelector('.rss-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const url = formData.get('url');
      state.link = url;
      validateUrl(state.link, state.validLinks, i18nInstance.t)
        .then(() => {
          watchedState.form.formState = 'loading';
          // console.log('loading');
        })
        .then(() => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(state.link)}`))
        .then((response) => {
          const data = parser(response);
          if (data === null) {
            throw i18nInstance.t('feedback.invalidRss');
          }
          watchedState.content.push(data);
          watchedState.form.formState = 'filling';
        })
        .then(() => {
          state.validLinks.push(state.link);
        })
        .then(() => {
          watchedState.form.formState = 'update';
        })
        .catch((err) => {
          watchedState.errorMessage = err;
          if (err) {
            watchedState.form.formState = 'error';
          }
        });
    });

    const postsContainer = document.querySelector('.posts');
    postsContainer.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        watchedState.button = 'a';
      } else if (e.target.tagName === 'BUTTON') {
        watchedState.button = 'button';
      }
    });
  });
};
export default app;
