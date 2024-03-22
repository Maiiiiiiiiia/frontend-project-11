import onChange from 'on-change';
import i18next from 'i18next';
import axios from 'axios';
import resources from './locales/index';
import validateUrl from './validateUrl';
import parser from './parser';
import {
  createContainerFilling, createContainerUpdate, renderLoading, renderFilling, renderError, renderClick,
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
    con: [],
  };

  // const checkNewPost = (watchedState) => {
  //   watchedState.validLinks.map((link) => {
  //     axios
  //       .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`)
  //       .then((response) => {
  //         const data = parser(response);
  //         const difference = builtUpdate(data, watchedState.content);
  //         if (difference.length !== 0) {
  //           const mainContent = watchedState.content.filter((item) => item.mainTitle === data.mainTitle);
  //           difference.map((post) => mainContent[0].posts.push(post));
  //           // console.log(watchedState.content)
  //           watchedState.content.push(difference);
  //           // console.log(watchedState.content)

  // mainContent[0].posts.push(...difference);


  //         }
  //       })
  //       .catch(() => {});
  //     return null;
  //   });
  //   setTimeout(() => checkNewPost(watchedState), 5000);
  //           console.log('setTimeout');
  // };

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
            renderFilling(state, i18nInstance.t, value);
          } else if (value === 'error') {
            renderError(state, i18nInstance.t);
          } else if (value === 'update') {
            checkNewPost(state, i18nInstance.t, value);
          }
          break;
        };
        case 'content': 
            createContainerUpdate(state.content, i18nInstance.t) // контент не обновляется!!!
          //   createContainerFilling(state.content, i18nInstance.t)
          // } else if (value === 'update') {
          //   console.log('content case work - update');
          //   createContainerUpdate(state.content, i18nInstance.t)
          // }
        // }
            // createContainerPost(state.content, i18nInstance.t);
            // console.log(path); // content
          break;
        case 'clickedLinks':
          renderClick(state);
          break;
        default:
          break;
      }
    });

const checkNewPost = (watchedState) => {
  const promises = watchedState.validLinks.map((link) => {
    axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`)
      .then((response) => {
        const data = parser(response);
        const difference = builtUpdate(data, watchedState.content);
        if (difference.length !== 0) {

            const mainContent = watchedState.content.filter((item) => item.mainTitle === data.mainTitle);
            difference.forEach((post) => mainContent[0].posts.push(post));
            
            // watchedState.content = mainContent.posts.push(...difference);
            mainContent[0].posts.push(...difference);
        }
            // watchedState.content.push(difference);

      })
      .catch(() => {});
  });
  Promise.all(promises)
    .then(() => {
      setTimeout(() => checkNewPost(watchedState), 5000);
      console.log('setTimeout');
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
        })
        .then(() => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(state.links)}`))
        .then((response) => {
          const data = parser(response, i18nInstance.t);
          // console.log(data);
          watchedState.content.push(data);
          watchedState.form.formState = 'filling';
        })
        .then(() => {
          watchedState.validLinks.push(state.links);
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
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
        const targetID = e.target.getAttribute('data-id');
        watchedState.clickedLinks.push(targetID);
      }
    });
  });
};
export default app;
