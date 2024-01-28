import onChange from "on-change";
import * as Yup from 'yup';


export default () => {
// model
const state = {
    link: '',
    validLinks: [],
  };

// view
// const sendButton = document.querySelector('[type="submit"]');
const render = (url) => {
    const schema = Yup.string().trim().required().url().notOneOf(state.validLinks);
    const feedback = document.querySelector('.feedback');
    const inputText = document.querySelector('#url-input');
    schema.validate(url)
    .then(() => {
        console.log('WATCHEDSTATE IS WORK');
        inputText.classList.remove('is-invalid');
        feedback.classList.replace('text-danger', 'text-success');
        feedback.textContent = 'RSS успешно загружен';
        state.validLinks.push(url);
        console.log(state.validLinks);
    })
    .catch(() => {
        inputText.classList.add('is-invalid');
        feedback.classList.replace('text-success', 'text-danger');
        feedback.textContent = 'Ссылка должна быть валидным URL';
        if(state.validLinks.includes(url)) {
            feedback.classList.replace('text-success', 'text-danger');
            feedback.textContent = 'RSS уже существует'; 
        }
    })
};

// view
const watchedState = onChange(state, () => {
    render(state.link);
});

// controller
const form = document.querySelector('.rss-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    watchedState.link = url;
});
};
