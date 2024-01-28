import * as Yup from 'yup';

const render = (url, state) => {
    const schema = Yup.string().trim().required().url().notOneOf(state.validLinks);
    const feedback = document.querySelector('.feedback');
    const inputText = document.querySelector('#url-input');
    const form = document.querySelector('.rss-form');

    schema.validate(url)
    .then(() => {
        inputText.classList.remove('is-invalid');
        feedback.classList.replace('text-danger', 'text-success');
        feedback.textContent = 'RSS успешно загружен';
        state.validLinks.push(url);
        console.log(state.validLinks);
        form.reset();
        inputText.focus();
    })
    .catch(() => {
        inputText.classList.add('is-invalid');
        feedback.classList.replace('text-success', 'text-danger');
        feedback.textContent = 'Ссылка должна быть валидным URL';
        console.log(state.validLinks);
        if (state.validLinks.includes(url)) {
            inputText.classList.add('is-invalid');
            feedback.classList.replace('text-success', 'text-danger');
            feedback.textContent = 'RSS уже существует'; 
            console.log('RSS уже существует');
        };
    })
};

export default render;

