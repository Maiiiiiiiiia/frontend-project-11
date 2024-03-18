// import axios from 'axios';
// import parser from './parser';
// import builtUpdate from './builtUpdate';
// // import createContainerPost from "./view";
// import createContainerPost from './render';

// const checkNewPost = (state, i18n, value) => {
//   console.log('checkNewPost');
//   state.validLinks.map((link) => {
//     axios
//       .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`)
//       .then((response) => {
//         const data = parser(response);
//         const difference = builtUpdate(data, state.content);
//         // console.log(difference);
//         if (difference.length !== 0) {
//           createContainerPost(difference, i18n, value);
//           const mainContent = state.content.filter((item) => item.mainTitle === data.mainTitle);
//           difference.map((post) => mainContent[0].posts.push(post));
//           // console.log(mainContent);
//           const postsContainer = document.querySelector('.posts');
//           const divCardBorder = document.createElement('div');
//           divCardBorder.textContent = ('hello from checkNewPost')
//           postsContainer.append(divCardBorder);
//         }
//       })
//       .catch(() => {});
//     return null;
//   });
//   setTimeout(() => checkNewPost(state), 5000);
// };
// export default checkNewPost;
