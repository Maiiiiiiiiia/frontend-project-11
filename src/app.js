#!/usr/bin/env node

import * as Yup from 'yup';
import onChange from "on-change";
import render from "./view";
import i18next from 'i18next';
import resources from './locales/index';

const language = 'ru';

const i18nInstance = i18next.createInstance();
const gettingInstance = i18nInstance
gettingInstance.init({
      lng: language,
      debug: false,
      resources,
});

const validateUrl = (url, validLinks, i18nInstance) => {
    Yup.setLocale({
        mixed: {
          notOneOf: i18nInstance.t('feedback.duplicate'),
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

const app = () => {
// // const defaultLanguage = 'ru';

  const state = {
    link: '',
    form: {
        isValid: null,
        formState: '',
    },
    validLinks: [],
    errorMessage: '',
  };

  
  const watchedState = onChange(state, () => {
    render(state.link, state);
  });

  // controller
  const form = document.querySelector('.rss-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    validateUrl(url, watchedState.validLinks, i18nInstance)
      .then((url) => {
        watchedState.form.isValid = true;
        watchedState.link = url;
        watchedState.errorMessage = '';
        watchedState.validLinks.push(url);
    })
    .catch((err) => {
        watchedState.form.isValid = false;
        watchedState.errorMessage = err.message;
    })
  });
};

export default app;
