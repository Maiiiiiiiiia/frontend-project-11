import onChange from 'on-change';
import i18next from 'i18next';
import axios from 'axios';
import render from './render';
import resources from './locales/index';
import validateUrl from './validateUrl';
import parser from './parser';
import renderClick from './renderClick';
import builtUpdate from './builtUpdate';
// import checkNewPost from './checkNewPost';

// const updater = () => {
//   setTimeout(() => {
//     // watchedState.form.formState = 'update';
//     updater();
//   }, 5000);
// };

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
//         .then(() => {
//           if (state.validLinks.length !== 0) {
//             state.validLinks.map((link) => {
//               axios
//               .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`)
//               .then((response) => {
//                 const data = parser(response);
//                 const difference = builtUpdate(data, state.content);
//                 console.log(difference);
// // watchedState.content.push(difference);
//                 // if (difference.length !== 0) {
//                 //   createContainerPost(difference, i18n, value);
//                 //   const mainContent = state.content.filter((item) => item.mainTitle === data.mainTitle);
//                 //   difference.map((post) => mainContent[0].posts.push(post));
//                 // }
//                 setTimeout(() => watchedState.content.push(difference), 5000);
//               })
//               .catch(() => {});
//               return null;
//             });
//             // setTimeout(() => watchedState.content.push(difference), 5000);
//           }
//         })
        .then(() => {
          // updater();
          // checkNewPost(watchedState, i18nInstance);
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
        console.log('controiier click a'); // при нажатии на <а> работает
        watchedState.button = 'a';
        // console.log(state.button);
      } else if (e.target.tagName === 'BUTTON') {
        // console.log('link click in controiier');
        watchedState.button = 'button';
      }
    });
  });
};
export default app;

// import onChange from 'on-change';
// import i18next from 'i18next';
// import render from './render';
// import resources from './locales/index';

// const app = () => {
//   const state = {
//     link: [],
//     form: {
//       isValid: null,
//       formState: '',
//     },
//     validLinks: [],
//     content: [],
//     errorMessage: '',
//     button: '',
//   };

//   const i18nInstance = i18next.createInstance();
//   const gettingInstance = i18nInstance;
//   gettingInstance.init({
//     lng: 'ru',
//     debug: false,
//     resources,
//   }).then(() => {
//     const watchedState = onChange(state, (path, value) => {
//       render(value, state, i18nInstance.t);
//     });

//     const form = document.querySelector('.rss-form');
//     form.addEventListener('submit', (e) => {
//       e.preventDefault();
//       const formData = new FormData(e.target);
//       const url = formData.get('url');
//       state.link = url;
//       watchedState.form.formState = 'filling';
//       console.log('controller filling');

//     });

//     const postsContainer = document.querySelector('.posts');
//     postsContainer.addEventListener('click', (e) => {
//       // e.preventDefault();
//       const datas = state.content;
//       const data = datas[datas.length - 1];
//       const items = data.posts;
//       items.forEach((item) => {
//         const { title } = item;
//         const { description } = item;
//         const { href } = item;
//         if (e.target.tagName === 'A') {
//           watchedState.button = 'a';
//           e.target.classList.remove('fw-bold');
//           e.target.classList.add('fw-normal', 'link-secondary');
//           e.target.setAttribute('href', href);
//         } else if (e.target.tagName === 'BUTTON') {
//           watchedState.button = 'button';

//           e.target.classList.remove('fw-bold');
//           e.target.classList.add('fw-normal', 'link-secondary');
//           const link = document.querySelector('.list-group-item > a');
//           link.classList.remove('fw-bold');
//           link.classList.add('fw-normal', 'link-secondary');
//           document.querySelector('.modal-header > h5').textContent = title;
//           document.querySelector('.modal-content > .modal-body').textContent = description;
//           document.querySelector('.modal-footer > a').setAttribute('href', href);
//         }
//       });
//     });

//     const updater = () => {
//       setTimeout(() => {
//         watchedState.form.formState = 'update';
//         console.log('controller update');
//         updater();
//       }, 5000);
//     };
//     updater();
//   });
// };
// export default app;
