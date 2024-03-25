import onChange from 'on-change';
import i18next from 'i18next';
import axios from 'axios';
import resources from './locales/index';
import validateUrl from './validateUrl';
import parser from './parser';
import {
  createContainerPost, renderLoading, renderFilling, renderError, renderClick,
} from './render';
import builtUpdate from './builtUpdate';

const app = () => {
  const state = {
    links: '',
    form: {
      formState: '',
    },
    validLinks: [],
    content: [],
    errorMessage: '',
    clickedLinks: [],
    difference: [],
  };

  const i18nInstance = i18next.createInstance();
  i18nInstance.init({
    lng: 'ru',
    debug: false,
    resources,
  }).then(() => {
    const watchedState = onChange(state, (path, value) => {
      switch (path) {
        case 'form.formState': {
          if (value === 'loading') {
            renderLoading();
          } else if (value === 'filling') {
            renderFilling(state, i18nInstance.t, state.form.formState);
          } else if (value === 'error') {
            renderError(state.errorMessage);
          } else if (value === 'update') {
            checkNewPost(state);
          }
          break;
        }
        case 'difference':
          createContainerPost(value, i18nInstance.t, state.form.formState);
          break;
        case 'clickedLinks':
          renderClick(state);
          break;
        default:
          break;
      }
    });

    const checkNewPost = (newState) => {
      const promises = newState.validLinks.map((link) => {
        axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`)
          .then((response) => {
            const data = parser(response);
            const difference = builtUpdate(data, newState.content);
            if (difference.length !== 0) {
              newState.difference.push(difference);
            }
          })
          .catch(() => {});
      });
      Promise.all(promises)
        .then(() => {
          setTimeout(() => checkNewPost(watchedState), 5000);
        });
    };

    const form = document.querySelector('.rss-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const url = formData.get('url');
      state.links = url;
      validateUrl(state.links, state.validLinks, i18nInstance.t)
        .then(() => {
          watchedState.form.formState = 'loading';
          console.log('loading');
        })
        .then(() => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(state.links)}`))
        .then((response) => {
          const data = parser(response, i18nInstance.t);
          if (data === null) {
          return;
          }
          watchedState.content.push(data);
          watchedState.form.formState = 'filling';
          console.log('filling');

        })
        .then(() => {
          watchedState.validLinks.push(state.links);
        })
        .then(() => {
          watchedState.form.formState = 'update';
        })
        .catch((err) => {
          watchedState.errorMessage = err;
          // if (err) {
            watchedState.form.formState = 'error';
          // }
        });
    });

    const postsContainer = document.querySelector('.posts');
    postsContainer.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
        const targetID = e.target.getAttribute('data-id');
        watchedState.clickedLinks.push(targetID);
      }
    });
  });
};
export default app;
