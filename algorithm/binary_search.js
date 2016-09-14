const quick_sort = require('./quick_sort.js');

function search(array, low, high, item) {
    const mid = Math.floor((low + high) / 2);
    while (low <= high) {
        if(item === array[mid])return mid;
        else if(item < array[mid]) return search(array, low, mid - 1, item);
        else return search(array, mid + 1, high, item);
    }
}

function binary_search(array, item) {
    quick_sort(array);

    const index = search(array, 0, array.length - 1, item);
    console.log(`${item} located at ${index}`);
    return index;
}

module.exports = binary_search;