const builtUpdate = (data, bigData) => {
  // const mainData = bigData.filter((elem) => elem.mainTitle === data.mainTitle)[0];
  const mainData = bigData.find((elem) => elem.mainTitle === data.mainTitle);
  const diffData = [];
  data.posts.forEach((dataItem) => {
    const duplicate = mainData.posts.filter((mainDataEl) => dataItem.href === mainDataEl.href);
    if (duplicate.length === 0) {
      diffData.push(dataItem);
    }
    // return null;
  });
  return diffData;
};
export default builtUpdate;
