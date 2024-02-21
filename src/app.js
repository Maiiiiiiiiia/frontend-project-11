#!/usr/bin/env node
import onChange from 'on-change';
import render from './view';

const app = () => {
  const state = {
    link: '',
    form: {
      isValid: null,
      formState: '',
    },
    validLinks: [],
    content: [],
    errorMessage: '',
  };

  const watchedState = onChange(state, (path, value) => {
    render(value, state);
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
