const render = (url, state) => {
  const feedback = document.querySelector('.feedback');
  const inputText = document.querySelector('#url-input');
  const form = document.querySelector('.rss-form');

  if (state.form.isValid) {
    inputText.classList.remove('is-invalid');
    feedback.classList.replace('text-danger', 'text-success');
    feedback.textContent = 'RSS успешно загружен';
    form.reset();
    inputText.focus();
  } else {
    inputText.classList.add('is-invalid');
    feedback.classList.replace('text-success', 'text-danger');
    feedback.textContent = state.errorMessage;
  }
};

export default render;
