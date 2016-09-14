function sort(array, start, end) {
    if(start < end) {
        let i = start, j = end;
        const pivot = array[start];
        while(i < j) {
            while(i < j && array[j] >= pivot) j--;
            if(i < j) array[i++] = array[j];
            while(i < j && array[i] < pivot) i++;
            if(i < j) array[j--] = array[i];
        }
        array[i] = pivot;
        sort(array, start, i - 1);
        sort(array, i + 1, end);
    }
}

module.exports = function (array) {
    sort(array, 0, array.length - 1);
};