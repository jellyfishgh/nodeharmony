module.exports = {
    init(count) {
        const array = new Array(count);
        for(let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 10);
        }
        return array;
    },
    print(array) {
        console.log('------');
        array.map((item) => {
            console.log(item);
        });
    },
    isSorted(array) {
        for(let i = 1; i < array.length; i++){
            if(array[i-1] > array[i]){
                console.log('if array is sorted: false');
                return false;
            }
        }
        console.log('if array is sorted: true');
        return true;
    },
    clone(array) {
        const arr = [];
        array.map((item) => {
            arr.push(item);
        });
        return arr;
    }
};