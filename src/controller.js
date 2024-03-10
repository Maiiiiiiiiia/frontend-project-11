// import onChange from 'on-change';
// import i18next from 'i18next';
// import render from './render';
// import resources from './locales/index';
// import validateUrl from './validateUrl';
// import parser from './parser';
// import axios, { AxiosError } from 'axios';


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
//     sendButton: '',
//   };

//   const updater = () => {
//     const timer = 5000;
//     setTimeout(() => {
//       // watchedState.form.formState = 'update';
//       updater();
//     }, timer);
//   };

  // const i18nInstance = i18next.createInstance();
  // const gettingInstance = i18nInstance;
  // gettingInstance.init({
  //   lng: 'ru',
  //   debug: false,
  //   resources,
  // }).then(() => {
  //   const watchedState = onChange(state, (path, value) => {
  //     render(state, i18nInstance.t);
  //   });
  
//     const form = document.querySelector('.rss-form');
//     const postsContainer = document.querySelector('.posts');

//     form.addEventListener('submit', (e) => {
//       e.preventDefault();
//       const formData = new FormData(e.target);
//       const url = formData.get('url');
//       // watchedState.link = url;
//       // watchedState.form.formState = 'filling';
//       validateUrl(state.link, state.validLinks, i18nInstance.t)
//           // .then(() => watchedState.sendButton = 'disabled')
//           .then(() => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`))
//           .then((response) => {
//             const data = parser(response, i18nInstance.t);
//             if (data === null) {
//               throw i18n('feedback.invalidRss');
//             }
//             watchedState.link = url;

//             // watchedState.content.push(data);
//             // console.log(data);
//             // console.log(state.content);[{…}]
//             watchedState.validLinks.push(url);
//             // watchedState.form.isValid = 'true';
//             // watchedState.sendButton = 'disabled';
//             // watchedState.form.formState = 'filling';

//             console.log('validate');
//             // console.log(state.form.isValid);
//           })
//           // .catch((error) => {
//           .catch(() => {
//             console.log('not validate');

//             // const { message } = error;

//             // watchedState.form.isValid = 'false';
//             // watchedState.errorMessage = message;
//             // watchedState.form.formState = 'fail';

//             // console.log(message);
//         });
//           // .catch(() => console.log('watchedState.form.isValid = '));

//           });

//     // postsContainer.addEventListener('click', (e) => {
//     // const datas = state.content;
//     // const data = datas[datas.length - 1];
//     // const items = data.posts;
//     // items.forEach((item) => {
//     //   const { title } = item;
//     //   const { description } = item;
//     //   const { href } = item;
//     //   if (e.target.tagName === 'A') {
//     //     e.target.classList.remove('fw-bold');
//     //     e.target.classList.add('fw-normal', 'link-secondary');
//     //     e.target.setAttribute('href', href);
//     //   } else if (e.target.tagName === 'BUTTON') {
//     //     e.target.classList.remove('fw-bold');
//     //     e.target.classList.add('fw-normal', 'link-secondary');
//     //     const link = document.querySelector('.list-group-item > a');
//     //     link.classList.remove('fw-bold');
//     //     link.classList.add('fw-normal', 'link-secondary');
//     //     document.querySelector('.modal-header > h5').textContent = title;
//     //     document.querySelector('.modal-content > .modal-body').textContent = description;
//     //     document.querySelector('.modal-footer > a').setAttribute('href', href);
//     //   }

// // в контроллере мы не меняем отображение, это делает рендер. В общем виде это выглядит так: контроллер отвечает только за данные, 
// // он работает только со стейтом и его меняет. Он может только навешивать обработчики на дом элементы, но сам их никак не меняет. 
// // Рендер, в свою очередь, никак не меняет стейт и не вешает никаких обработчиков, 
// // он реагирует на изменения в стейте и применяет их к дом дереву


//     // });
//   // });
//   });
// // обновление по таймеру никак не связано с формой
// };
// export default app;




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
    button: '',
  };


  // const i18nInstance = i18next.createInstance();
  // const gettingInstance = i18nInstance;
  // gettingInstance.init({
  //   lng: 'ru',
  //   debug: false,
  //   resources,
  // }).then(() => {
  //   const watchedState = onChange(state, (path, value) => {
  //     render(state, i18nInstance.t);
  //   });
  
  //   const form = document.querySelector('.rss-form');
  //   const postsContainer = document.querySelector('.posts');



  const i18nInstance = i18next.createInstance();
  const gettingInstance = i18nInstance;
  gettingInstance.init({
    lng: 'ru',
    debug: false,
    resources,
  }).then(() => {
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


    const postsContainer = document.querySelector('.posts');
    postsContainer.addEventListener('click', (e) => {
      // e.preventDefault();
      const datas = state.content;
      const data = datas[datas.length - 1];
      const items = data.posts;
      items.forEach((item) => {
        const { title } = item;
        const { description } = item;
        const { href } = item;
        if (e.target.tagName === 'A') {
          e.target.classList.remove('fw-bold');
          e.target.classList.add('fw-normal', 'link-secondary');
          e.target.setAttribute('href', href);
        } else if (e.target.tagName === 'BUTTON') {
          // e.target.classList.remove('fw-bold');
          e.target.classList.remove('fw-bold');
          e.target.classList.add('fw-normal', 'link-secondary');
          const link = document.querySelector('.list-group-item > a');
          link.classList.remove('fw-bold');
          link.classList.add('fw-normal', 'link-secondary');
          document.querySelector('.modal-header > h5').textContent = title;
          document.querySelector('.modal-content > .modal-body').textContent = description;
          document.querySelector('.modal-footer > a').setAttribute('href', href);
        }
      });
    });

    const updater = () => {
      setTimeout(() => {
        watchedState.form.formState = 'update';
        updater();
      }, 5000);
    };
    updater();

  });
};

export default app;