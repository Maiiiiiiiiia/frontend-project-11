import onChange from 'on-change';
import i18next from 'i18next';
import axios from 'axios';
import * as Yup from 'yup';
import resources from './locales/index';
import validateUrl from './validateUrl';
import parser from './parser';
import builtUpdate from './builtUpdate';
import {
  createContainerPosts, createContainerFeeds, renderLoading,
  renderFilling, renderError, renderClick,
} from './render';

const app = () => {
  const state = {
    form: {
      formState: '',
    },
    validLinks: [],
    feeds: [],
    posts: [],
    difference: [],
    errorMessage: '',
    clickedLinks: [],
  };

  const allOriginsUrl = 'https://allorigins.hexlet.app/get?disableCache=true&url=';

  const i18nInstance = i18next.createInstance();
  i18nInstance.init({
    lng: 'ru',
    debug: false,
    resources,
  }).then(() => {
    const checkNewPost = (newState) => {
      const promises = newState.validLinks.map((link) => axios.get(`${allOriginsUrl}${encodeURIComponent(link)}`)
        .then((response) => {
          const data = parser(response);
          const difference = builtUpdate(data, newState.posts);
          if (difference.length !== 0) {
            watchedState.posts.push(difference);
          }
        })
        .catch(() => {}));
      return Promise.all(promises)
        .then(() => {
          setTimeout(() => checkNewPost(newState), 5000);
        });
    };

    const watchedState = onChange(state, (path, value) => {
      switch (path) {
        case 'form.formState': {
          if (value === 'loading') {
            renderLoading();
          } else if (value === 'filling') {
            renderFilling(state, i18nInstance.t, state.form.formState);
          } else if (value === 'error') {
            renderError(state.errorMessage, i18nInstance.t);
          } else if (value === 'update') {
            checkNewPost(state);
          }
          break;
        }
        case 'posts':
          createContainerPosts(value, i18nInstance.t, state.form.formState);
          break;
        case 'feeds':
          createContainerFeeds(value, i18nInstance.t);
          break;
        case 'clickedLinks':
          renderClick(state);
          break;
        default:
          break;
      }
    });

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

    const form = document.querySelector('.rss-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const url = formData.get('url');
      validateUrl(url, state.validLinks, i18nInstance.t)
        .then(() => {
          watchedState.form.formState = 'loading';
        })
        .then(() => axios.get(`${allOriginsUrl}${encodeURIComponent(url)}`))
        .then((response) => {
          const data = parser(response, i18nInstance.t);
          watchedState.feeds.push(data);
          watchedState.posts.push(data);

          watchedState.form.formState = 'filling';
        })
        .then(() => {
          watchedState.validLinks.push(url);
          watchedState.form.formState = 'update';
        })
        .catch((err) => {
          if (err.message === 'Network Error') {
            watchedState.errorMessage = i18nInstance.t('feedback.axiosError');
          } else {
            watchedState.errorMessage = err.message;
          }
          watchedState.form.formState = 'error';
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
