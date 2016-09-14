const binary_search = require('../algorithm/binary_search.js');
const tool = require('./arrTool.js');

const array = tool.init(6);
tool.print(array);
tool.isSorted(array);
const arr = tool.clone(array);
binary_search(array, arr[0]);
binary_search(array, arr[2]);
tool.print(array);