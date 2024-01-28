import onChange from "on-change";
import render from "./view";


export default () => {
// model
const state = {
    link: '',
    validLinks: [],
  };

const watchedState = onChange(state, () => {
    render(state.link, state);
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
