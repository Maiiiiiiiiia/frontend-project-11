import axios from "axios";
import parser from "./parser";
import builtUpdate from "./builtUpdate";
import createContainerPost from "./view";

const checkNewPost = (state, i18n) => {
  state.validLinks.map((link) => {
    axios
      .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`)
      .then((response) => {
        const data = parser(response);
        const difference = builtUpdate(data, state.content);
        if (difference.length !== 0) {
          createContainerPost(difference, i18n, state);
          const mainContent = state.content.filter((item) => item.mainTitle === data.mainTitle);
          difference.map((post) => mainContent[0].posts.push(post));
        }
      })
      .catch(() => {});
    return null;
  });
  setTimeout(() => checkNewPost(state), 5000);
};
export default checkNewPost;
