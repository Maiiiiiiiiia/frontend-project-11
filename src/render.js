import { AxiosError } from 'axios';
// import parser from './parser';
// import builtUpdate from './builtUpdate';
import createContainerPost from './view';
import checkNewPost from './checkNewPost';

const feedback = document.querySelector('.feedback');
const inputText = document.querySelector('#url-input');
const sendButton = document.querySelector('[type="submit"]');

// const updater = () => {
//   setTimeout(() => {
//     // watchedState.form.formState = 'update';
//     updater();
//   }, 5000);
// };

const render = (state, i18n) => {
  // state.form.formState = '';
  if (state.form.formState === 'loading') {
    sendButton.disabled = true;
    feedback.classList.remove('text-danger', 'text-success', 'is-invalid');
    feedback.textContent = '';
  }
  if (state.form.formState === 'filling') {
    if (inputText.classList.contains('is-invalid')) {
      inputText.classList.remove('is-invalid');
    }
    feedback.classList.add('text-success');
    feedback.textContent = i18n('feedback.success');
    createContainerPost(state.content, i18n, state);
    inputText.value = '';
    inputText.focus();
    sendButton.removeAttribute('disabled');
  }
  if (state.form.formState === 'error') {
    sendButton.removeAttribute('disabled');
    if (!inputText.classList.contains('is-invalid')) {
      inputText.classList.add('is-invalid');
    }
    feedback.classList.add('text-danger');
    const error = `${state.errorMessage}`;
    if (state.errorMessage instanceof AxiosError) {
      feedback.textContent = i18n('feedback.axiosError');
    } else if (error.includes('ValidationError: ')) {
      const [, result] = error.split('ValidationError: ');
      feedback.textContent = result;
    } else {
      feedback.textContent = error;
    }
  }
  if (state.form.formState === 'update') {
    if (state.validLinks.length !== 0) {
      checkNewPost(state, i18n);
    }
  //   if (state.button = 'a') {
  //   console.log('render A');
  // }
  }
};
export default render;

// import axios, { AxiosError } from 'axios';
// import parser from './parser';
// import builtUpdate from './builtUpdate';
// import createContainerPost from './view';
// import validateUrl from './validateUrl';

// const feedback = document.querySelector('.feedback');
// const inputText = document.querySelector('#url-input');
// const sendButton = document.querySelector('[type="submit"]');

// const render = (value, state, i18n) => {
//   state.form.formState = '';
//   if (value === 'filling') {
//     console.log('render filling');

//     validateUrl(state.link, state.validLinks, i18n)
//       .then(() => {
//         sendButton.disabled = true;
//         feedback.classList.remove('text-danger', 'text-success', 'is-invalid');
//         feedback.textContent = '';
//       })
//       .then(() => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(state.link)}`))
//       .then((response) => {
//         const data = parser(response);
//         // console.log(data);
//         if (data === null) {
//           throw i18n('feedback.invalidRss');
//         }
//         state.content.push(data);
//         // console.log(data);
//         // const fff = state.content;
//         // console.log(fff.length);
//       })
//       .then(() => {
//         state.validLinks.push(state.link);
//         if (inputText.classList.contains('is-invalid')) {
//           inputText.classList.remove('is-invalid');
//         }
//         feedback.classList.add('text-success');
//         feedback.textContent = i18n('feedback.success');
//         createContainerPost(state.content, value, i18n, state);
//         inputText.value = '';
//         inputText.focus();
//         sendButton.removeAttribute('disabled');

//       })
//       .catch((err) => {
//         sendButton.removeAttribute('disabled');
//         if (!inputText.classList.contains('is-invalid')) {
//           inputText.classList.add('is-invalid');
//         }
//         feedback.classList.add('text-danger');
//         const error = `${err}`;
//         if (err instanceof AxiosError) {
//           feedback.textContent = i18n('feedback.axiosError');
//         } else if (error.includes('ValidationError: ')) {
//           const [, result] = error.split('ValidationError: ');
//           feedback.textContent = result;
//         } else {
//           feedback.textContent = error;
//         }
//       });
//   } if (value === 'update') {
//     if (state.validLinks.length !== 0) {
//       state.validLinks.map((link) => {
//         axios
//           .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`)
//           .then((response) => {
//             const data = parser(response);
//             const difference = builtUpdate(data, state.content);
//             if (difference.length !== 0) {
//             createContainerPost(difference, value, i18n, state.button);
//             const mainContent = state.content.filter((item) => item.mainTitle === data);
//             if (mainContent.length !== 0) {
//             difference.map((post) => mainContent[0].posts.push(post));
//             }
//             }
//           })
//           .catch(() => {});
//         return null;
//       });
//     }
//   }
// };
// export default render;
