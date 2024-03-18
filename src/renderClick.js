const renderClick = (state) => {
  const response = state.content;
  const data = response[response.length - 1];
  const items = data.posts;
  // console.log(items);
  items.forEach((item) => {
    const { title } = item;
    const { href } = item;
    const { description } = item;
    const a = document.querySelector('.list-group-item > a');
    if (state.button === 'a') {
      a.classList.remove('fw-bold');
      a.classList.add('fw-normal', 'link-secondary');
      state.button = '';
    }
    if (state.button === 'button') {
      a.classList.remove('fw-bold');
      a.classList.add('fw-normal', 'link-secondary');
      document.querySelector('.modal-header > h5').textContent = title;
      document.querySelector('.modal-content > .modal-body').textContent = description;
      document.querySelector('.modal-footer > a').setAttribute('href', href);
    }
  });
};
export default renderClick;
