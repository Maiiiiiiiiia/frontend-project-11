export default (data, bigData) => {
  const mainData = bigData.filter((elem) => elem.mainTitle === data.mainTitle)[0];
  const diffData = [];
  data.posts.forEach((dataItem) => {
    const duplicate = mainData.posts.filter((mainDataEl) => dataItem.href === mainDataEl.href);
    if (duplicate.length === 0) {
      diffData.push(dataItem);
    }
    return null;
  });
  return diffData;
};
