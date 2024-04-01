const builtUpdate = (response, bigData) => {
  const data = response.posts;
  const diffData = data.filter((item) => !bigData.some((bigItem) => bigItem.title === item.title));
  return diffData;
};

export default builtUpdate;
