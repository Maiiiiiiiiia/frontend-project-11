import axios, { AxiosError } from 'axios';
import parser from './parser';
import builtUpdate from './builtUpdate';
import createContainerPost from './view';
import validateUrl from './validateUrl';

const feedback = document.querySelector('.feedback');
const inputText = document.querySelector('#url-input');
const sendButton = document.querySelector('[type="submit"]');

const render = (state, i18n) => {
  state.form.formState = '';

  if (state.form.isValid = 'true') {
    if (state.sendButton = 'disabled') {
    sendButton.disabled = true;
    feedback.classList.remove('text-danger', 'text-success', 'is-invalid');
    feedback.textContent = '';
    }
    if (inputText.classList.contains('is-invalid')) {
        inputText.classList.remove('is-invalid');
      }
        feedback.classList.add('text-success');
        feedback.textContent = i18n('feedback.success');

// const createContainerPost = (response, value, i18n) => {
//   console.log(response);
// // Array(1)
// // 0: {mainTitle: 'Lorem ipsum feed for an interval of 1 minutes with 10 item(s)', mainDescription: 'This is a constantly updating lorem ipsum feed', posts: Array(10)}
// // length : 1
// // [[Prototype]] : Array(0)
        createContainerPost(state.content, state, i18n);

        inputText.value = '';
        inputText.focus();
        sendButton.removeAttribute('disabled');

    }
    
    
    if (state.form.isValid = 'false') {
      sendButton.removeAttribute('disabled');
        if (!inputText.classList.contains('is-invalid')) {
          inputText.classList.add('is-invalid');
        }
        feedback.classList.add('text-danger');
        const err = state.errorMessage;
        const error = `${state.errorMessager}`;
        if (err instanceof AxiosError) {
          feedback.textContent = i18n('feedback.axiosError');
        } else if (error.includes('ValidationError: ')) {
          const [, result] = error.split('ValidationError: ');
          feedback.textContent = result;
        } else {
          feedback.textContent = err;
        }
      };

  // if (value === 'filling') {
    // validateUrl(state.link, state.validLinks, i18n)
      // .then(() => {
      //   sendButton.disabled = true;
      //   feedback.classList.remove('text-danger', 'text-success', 'is-invalid');
      //   feedback.textContent = '';
      // })
      // .then(() => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(state.link)}`))
      // .then((response) => {
      //   const data = parser(response, i18n);
      //   if (data === null) {
      //     throw i18n('feedback.invalidRss');
      //   }
      //   state.content.push(data);
      // })
      // .then(() => {
      //   state.validLinks.push(state.link);
        // // if (inputText.classList.contains('is-invalid')) {
        // //  // inputText.classList.remove('is-invalid');
        // // }
        // // feedback.classList.add('text-success');
        // // feedback.textContent = i18n('feedback.success');
        // // createContainerPost(state.content, value, i18n);
        // // inputText.value = '';
        // // inputText.focus();
        // /// sendButton.removeAttribute('disabled');
      // })
      // .catch((err) => {
      //   sendButton.removeAttribute('disabled');
      //   if (!inputText.classList.contains('is-invalid')) {
      //     inputText.classList.add('is-invalid');
      //   }
      //   feedback.classList.add('text-danger');
      //   const error = `${err}`;
        // if (err instanceof AxiosError) {
        //   feedback.textContent = i18n('feedback.axiosError');
        // } else if (error.includes('ValidationError: ')) {
        //   const [, result] = error.split('ValidationError: ');
        //   feedback.textContent = result;
        // } else {
        //   feedback.textContent = error;
        // }
      // });
  // } 
  
  
  
  //if (value === 'update') {
  //   if (state.validLinks.length !== 0) {
  //     state.validLinks.map((link) => {
  //       axios
  //         .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`)
  //         .then((response) => {
  //           const data = parser(response, i18n);
  //           const difference = builtUpdate(data, state.content);
  //           if (difference.length !== 0) {
  //             createContainerPost(difference, value, i18n, state.button);
  //             const mainContent = state.content.filter((item) => item.mainTitle === data.mainTitle);
  //             difference.map((post) => mainContent[0].posts.push(post));
  //           }
  //         })
  //         .catch(() => {});
  //       return null;
  //     });
  //   }
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
//     console.log('truuuue');
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
//       })
//       .then(() => {
//         state.validLinks.push(state.link);
//         if (inputText.classList.contains('is-invalid')) {
//           inputText.classList.remove('is-invalid');
//         }
//         feedback.classList.add('text-success');
//         feedback.textContent = i18n('feedback.success');
//         createContainerPost(state.content, value, i18n, state.button);
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
//     console.log('falseee');

//     if (state.validLinks.length !== 0) {
//       state.validLinks.map((link) => {
//         axios
//           .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`)
//           .then((response) => {
//             const data = parser(response);
//             const difference = builtUpdate(data, state.content);
//             if (difference.length !== 0) {
//               createContainerPost(difference, value, i18n, state.button);
//               const mainContent = state.content.filter((item) => item.mainTitle === data.mainTitle);
//               difference.map((post) => mainContent[0].posts.push(post));
//             }
//           })
//           .catch(() => {});
//         return null;
//       });
//     }
//   }
// };
// export default render;