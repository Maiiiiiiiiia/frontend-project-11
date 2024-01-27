import onChange from "on-change";
import * as Yup from 'yup';


export default () => {

const state = {
        validLinks: [],
  };

const form = document.querySelector('.rss-form');
const inputText = document.querySelector('#url-input');
const sendButton = document.querySelector('[type="submit"]');
const feedback = document.querySelector('.feedback');

// const render = () => {};
// const watchedState = onChange(state, render);

// Второй вариант валидации:
// const schema = yup.object().shape({
//     url: yup.string().required().url('Ссылка должна быть валидным URL').notOneOf(validLinks),
//   });
// const validate = (url) => {
//     try {
//         schema.validateSync(url);
//         return {};
//     //return true;
//     console.log('валидно');
//     } catch {
//     //return false;
//     console.log('не валидно')
//     }
// };


const isValidLinks = (url) => {
try {
    // Yup.string().required().url().validate(url);
    Yup.string().required().url().notOneOf(validLinks);
    //return true;
    console.log('валидно');
} catch {
    //return false;
    console.log('не валидно')
}
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    const isValidLink = isValidLinks(url);

if (isValidLink) {
    state.validLinks.push(isValidLink);
    feedback.classList.replace('text-danger', 'text-success');
    feedback.textContent = 'RSS успешно загружен';
} else 
    feedback.classList.replace('text-success', 'text-danger');
    feedback.textContent = 'Ссылка должна быть валидным URL';
});

};
