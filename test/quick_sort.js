const quick_sort = require('../algorithm/quick_sort.js');
const tool = require('./arrTool.js');

const array = tool.init(10);
// // const array = [8,9,9,6,3,9];
// // const array = [9,1,7,8,3,0];
// // const array = [8,7,6,4,0,3];
// // const array = [1,8,8,4,3,5];
// // const array = [1,3,4,5];
tool.print(array);
tool.isSorted(array);
quick_sort(array);
tool.print(array);
tool.isSorted(array);

// for (let i = 1; i < 20; i++) {
//     let j = 3;
//     while (j-- > 0) {
//         const array = tool.init(i);
//         quick_sort(array);
//         if (!tool.isSorted(array)) console.log(array);
//     }
// }