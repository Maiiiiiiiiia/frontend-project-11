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

  const i18nInstance = i18next.createInstance();
  const gettingInstance = i18nInstance;
  gettingInstance.init({
    lng: 'ru',
    debug: false,
    resources,
  });

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
    const content = state.content;
    // let items;
    const data = content[content.length - 1];
    const items = data.posts;
    items.map((item) => {
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
        link.classList.add('fw-normal', 'link-secondary')
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
};

export default app;
