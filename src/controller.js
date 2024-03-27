import onChange from 'on-change';
import i18next from 'i18next';
import axios from 'axios';
import resources from './locales/index';
import validateUrl from './validateUrl';
import parser from './parser';
import builtUpdate from './builtUpdate';

import {
  createContainerFeeds, createContainerPosts, renderLoading, renderFilling, renderError, renderClick,
} from './render';

const app = () => {
  const state = {
    form: {
      formState: '',
    },
    validLinks: [],
    feeds: [],
    posts: [],
    errorMessage: '',
    clickedLinks: [],
  };

  const i18nInstance = i18next.createInstance();
  i18nInstance.init({
    lng: 'ru',
    debug: false,
    resources,
  }).then(() => {
    const checkNewPost = (newState) => {
      console.log('checkNewPost');
      const promises = newState.validLinks.map((link) => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`)
        .then((response) => {
          // console.log(response);
          const data = parser(response);
          console.log(data);

          const difference = builtUpdate(data, newState.posts);
          console.log(difference); //  не работает builtUpdate ???

          if (difference.length !== 0) {
            // newState.difference.push(difference);
            newState.posts.push(difference);
          }
        })
        .catch(() => {}));
      return Promise.all(promises)
        .then(() => {
          setTimeout(() => checkNewPost(newState), 5000);
          console.log('checkNewPost setTimeOut');
        });
    };

    const watchedState = onChange(state, (path, value) => {
      switch (path) {
        case 'form.formState': {
          if (value === 'loading') {
            renderLoading();
          } else if (value === 'filling') {
            renderFilling(state, i18nInstance.t);
          } else if (value === 'error') {
            renderError(state.errorMessage);
          } else if (value === 'update') {
            checkNewPost(state);
          }
          break;
        }
        case 'feeds':
          createContainerFeeds(value, i18nInstance.t);
          break;
        case 'posts':
          createContainerPosts(value, i18nInstance.t);
          break;
        case 'clickedLinks':
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
      // state.links = url;
      validateUrl(url, state.validLinks, i18nInstance.t)
        .then(() => {
          watchedState.form.formState = 'loading';
          console.log("loading");
        })
        .then(() => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`))
        .then((response) => {
          const data = parser(response, i18nInstance.t);
          console.log(data.posts);

          // watchedState.content.push(data);
          // watchedState.feeds.push(data);
          watchedState.posts.push(data.posts);

          watchedState.form.formState = 'filling';
          console.log("filling");

        })
        .then(() => {
          watchedState.validLinks.push(state.links);
          watchedState.form.formState = 'update';
        })

        .catch((err) => {
          console.log(err);
          // if (err.message === i18nInstance.t('feedback.invalidUrl')) {
          //   watchedState.errorMessage = i18nInstance.t('feedback.invalidUrl');
          // } else if (err.message === i18nInstance.t('feedback.duplicate')) {
          //   watchedState.errorMessage = i18nInstance.t('feedback.duplicate');
          // } else if (err.message === i18nInstance.t('feedback.empty')) {
          //   watchedState.errorMessage = i18nInstance.t('feedback.empty');
          // } else if (err.message === i18nInstance.t('feedback.axiosError')) {
          //   watchedState.errorMessage = i18nInstance.t('feedback.axiosError');
          // } else if (err.message === i18nInstance.t('feedback.invalidRss')) {
          //   watchedState.errorMessage = i18nInstance.t('feedback.invalidRss');
          // } else {
          //   watchedState.errorMessage = i18nInstance.t('feedback.axiosError');
          // }
          watchedState.errorMessage = err.message === i18nInstance.t('feedback.axiosError')
          ? i18nInstance.t('feedback.axiosError')
          : err.message;
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
