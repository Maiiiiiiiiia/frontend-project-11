const createAndAppendElement = (parent, elementType, classes, content) => {
    const element = document.createElement(elementType);
    classes.forEach(className => {
      element.classList.add(className);
    });
    if (content) {
      element.textContent = content;
    }
    parent.append(element);
    return element;
};

const createContainerPost = (response, state, i18n) => {
  console.log(response);

  // // Array(1)
// // 0: {mainTitle: 'Lorem ipsum feed for an interval of 1 minutes with 10 item(s)', mainDescription: 'This is a constantly updating lorem ipsum feed', posts: Array(10)}
// // length : 1
// // [[Prototype]] : Array(0)
  // let items;
  // if (state.form.isValid === 'true') {
  //   const data = response[response.length - 1];
  //   items = data.posts.reverse();
  //   const postsContainer = document.querySelector('.posts');
  //   const feedsContainer = document.querySelector('.feeds');
  //   if (!postsContainer.hasChildNodes()) {
  //     const divCardBorder = createAndAppendElement(postsContainer, 'div', ['card', 'border-0']);
  //     const divFeeds = createAndAppendElement(feedsContainer, 'div', ['card', 'border-0']);
  //     const divCardBody = createAndAppendElement(divCardBorder, 'div', ['card-body']);
  //     const divCard = createAndAppendElement(divFeeds, 'div', ['card-body']);
  //     const ulFeeds = createAndAppendElement(divFeeds, 'ul', ['list-group', 'border-0', 'rounded-0']);
  //     createAndAppendElement(divCardBody, 'h2', ['card-title', 'h4'], i18n('items.posts'));
  //     createAndAppendElement(divCard, 'h2', ['card-title', 'h4'], i18n('items.feeds'));
  //     createAndAppendElement(divCardBorder, 'ul', ['list-group', 'border-0', 'rounded-0']);
  //     createAndAppendElement(divFeeds, 'ul', ['list-group', 'border-0', 'rounded-0']);
      
  //     const { mainTitle } = data;
  //     const { mainDescription } = data;
  //     const li = createAndAppendElement(ulFeeds, 'li', ['list-group-item', 'border-0', 'border-end-0']);
  //     createAndAppendElement(li, 'h3', ['h6', 'm-0'], mainTitle);
  //     createAndAppendElement(li, 'p', ['m-0', 'small', 'text-black-50'], mainDescription);
  //   } else {
  //     const { mainTitle } = data;
  //     const { mainDescription } = data;

  //     const ulFeeds = document.querySelector('.feeds > .card > .list-group');

  //     const li = createAndAppendElement(ulFeeds, 'li', ['list-group-item', 'border-0', 'border-end-0']);
  //     createAndAppendElement(li, 'h3', ['h6', 'm-0'], mainTitle);
  //     createAndAppendElement(li, 'p', ['m-0', 'small', 'text-black-50'], mainDescription);
  //   }
  // // } if (value === 'notvalid') {
  // } 
  // if (state.formState === 'update') {
    // items = response;
    // console.log(response);

  // }
  // const ulPost = document.querySelector('.posts > .card > .list-group');
  // console.log(items);
  // items.map((item) => {
  //   const { title } = item;
  //   const { href } = item;
  //   const { id } = item;

  //   const li = createAndAppendElement(ulPost, 'li', ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0']);
  //   const a = createAndAppendElement(li, 'a', ['fw-bold'], title)
  //   a.setAttribute('href', href);
  //   a.setAttribute('data-id', id);
  //   a.setAttribute('target', '_blank');
  //   a.setAttribute('rel', 'noopener noreferrer');

  //   const button = createAndAppendElement(li, 'button', ['btn', 'btn-outline-primary', 'btn-sm'], i18n('buttons.view'))
  //   button.setAttribute('type', 'button');
  //   button.setAttribute('data-id', id);
  //   button.setAttribute('data-bs-toggle', 'modal');
  //   button.setAttribute('data-bs-target', '#modal');

  //   ulPost.prepend(li);
  //   return null;
  // });
};
export default createContainerPost;


// const createContainerPost = (response, value, i18n) => {
//   // console.log(response);

// // [{…}]
// // 0 : {title: 'Lorem ipsum 2024-03-09T10:26:00Z', description: 'Quis aute pariatur eiusmod deserunt labore elit enim.', href: 'http://example.com/test/1709979960', id: '151'}
// // length : 1
// // [[Prototype]] : Array(0)

//   let items;
//   if (value === 'filling') {
//     const data = response[response.length - 1];
//     items = data.posts.reverse();
//     const postsContainer = document.querySelector('.posts');
//     const feedsContainer = document.querySelector('.feeds');
//     if (!postsContainer.hasChildNodes()) {
//       const divCardBorder = document.createElement('div');
//       divCardBorder.classList.add('card', 'border-0');
//       postsContainer.append(divCardBorder);
//       const divFeeds = document.createElement('div');
//       divFeeds.classList.add('card', 'border-0');
//       feedsContainer.append(divFeeds);
//       const divCardBody = document.createElement('div');
//       divCardBody.classList.add('card-body');
//       divCardBorder.append(divCardBody);
//       const divCard = document.createElement('div');
//       divCard.classList.add('card-body');
//       const ulFeeds = document.createElement('ul');
//       ulFeeds.classList.add('list-group', 'border-0', 'rounded-0');
//       divFeeds.append(divCard, ulFeeds);
//       const h2 = document.createElement('h2');
//       h2.classList.add('card-title', 'h4');
//       h2.textContent = i18n('items.posts');
//       divCardBody.append(h2);
//       const h2Feeds = document.createElement('h2');
//       h2Feeds.classList.add('card-title', 'h4');
//       h2Feeds.textContent = i18n('items.feeds');
//       divCard.append(h2Feeds);
//       const ul = document.createElement('ul');
//       ul.setAttribute('class', 'list-group border-0 rounded-0');
//       divCardBorder.append(ul);
//       const ul2 = document.createElement('ul');
//       ul2.setAttribute('class', 'list-group border-0 rounded-0');
//       divFeeds.append(ul2);
//       const { mainTitle } = data;
//       const { mainDescription } = data;
//       const li = document.createElement('li');
//       li.classList.add('list-group-item', 'border-0', 'border-end-0');
//       ulFeeds.append(li);
//       const h3 = document.createElement('h3');
//       h3.classList.add('h6', 'm-0');
//       h3.textContent = (mainTitle);
//       const p = document.createElement('p');
//       p.classList.add('m-0', 'small', 'text-black-50');
//       p.textContent = (mainDescription);
//       li.append(h3, p);
//     } else {
//       const { mainTitle } = data;
//       const { mainDescription } = data;
//       const li = document.createElement('li');
//       const ulFeeds = document.querySelector('.feeds > .card > .list-group');
//       li.classList.add('list-group-item', 'border-0', 'border-end-0');
//       ulFeeds.prepend(li);
//       const mainH = document.createElement('h3');
//       mainH.classList.add('h6', 'm-0');
//       mainH.textContent = mainTitle;
//       li.append(mainH);
//       const mainP = document.createElement('p');
//       mainP.classList.add('m-0', 'small', 'text-black-50');
//       mainP.textContent = mainDescription;
//       li.append(mainP);
//     }
//   } if (value === 'update') {
//     items = response;
//   }
//   const ulPost = document.querySelector('.posts > .card > .list-group');
//   items.map((item) => {
//     const li = document.createElement('li');
//     li.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-start border-0 border-end-0');
//     const { title } = item;
//     const { href } = item;
//     const { id } = item;
//     const a = document.createElement('a');
//     a.setAttribute('href', href);
//     a.classList.add('fw-bold');
//     a.setAttribute('data-id', id);
//     a.setAttribute('target', '_blank');
//     a.setAttribute('rel', 'noopener noreferrer');
//     a.textContent = title;
//     li.append(a);
//     const button = document.createElement('button');
//     button.setAttribute('type', 'button');
//     button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
//     button.setAttribute('data-id', id);
//     button.setAttribute('data-bs-toggle', 'modal');
//     button.setAttribute('data-bs-target', '#modal');
//     button.textContent = i18n('buttons.view');
//     li.append(button);
//     ulPost.prepend(li);
//     return null;
//   });
// };
// export default createContainerPost;