import onChange from 'on-change';
import i18next from 'i18next';
import render from './render';
import resources from './locales/index';

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

    state.link = url;
    watchedState.form.formState = 'filling';
  });

  const updater = () => {
    setTimeout(() => {
      watchedState.form.formState = 'update';
      updater();
    }, 5000);
  };
  updater();
};

export default app;
