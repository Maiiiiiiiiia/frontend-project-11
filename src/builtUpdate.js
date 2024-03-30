// const builtUpdate = (data, bigData) => {
//   console.log(data.posts) // это новое
//   const a = data.posts;
//   // a.forEach((s) => console.log(s.title));
//   console.log(bigData[0]) // это то что на сайте уже 
// // раньше в bigdata был контент
// // 
// // {mainTitle: 'Lorem ipsum feed for an interval of 1 seconds with 10 item(s)', mainDescription: 'This is a constantly updating lorem ipsum feed', posts: Array(10)}
// // mainDescription: "This is a constantly updating lorem ipsum feed"
// // mainTitle: "Lorem ipsum feed for an interval of 1 seconds with 10 item(s)"
// // posts: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// // [[Prototype]]: Object
// // и мы искали в mainTitle

// // а теперь это:
// // [Array(10)]
// // 0: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// // length: 1
// // [[Prototype]]: Array(0)

//   const mainData = bigData.find((elem) => elem.mainTitle === data.mainTitle);
//   const diffData = [];
//   data.posts.forEach((dataItem) => {
//     const duplicate = mainData.posts.filter((mainDataEl) => dataItem.href === mainDataEl.href);
//     if (duplicate.length === 0) {
//       diffData.push(dataItem);
//     }
//     // return null;
//   });
//   return diffData;
// };

const builtUpdate = (data1, bigData1) => {
  const data = data1.posts;
  const bigData = bigData1[0];
  // const diffData = [];
  // console.log(data); (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
  // console.log(bigData); (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]


  const diffData = data.filter(item => !bigData.some(bigItem => bigItem.title === item.title));

    // diffData.push(f)

  return diffData;
};

export default builtUpdate;
