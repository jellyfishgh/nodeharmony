/**
 * 检索一个字符串，求该字符串中出现 个数count 最多的 整数n 的和
 * if max(count*n) then ?
 * jellyfishgh
 */

function insert(nc, key) {
    // 一定要注意优先级 ＋ > (?:)
    nc[key] = (nc[key] ? nc[key] : 0) + 1;
    if (nc[key] > nc.max) {
        nc.max = nc[key];
        nc.maxkeys = {};
        nc.maxkeys[key] = nc[key];
    } else if (nc[key] === nc.max && !nc.maxkeys[key]) {
        nc.maxkeys[key] = nc[key];
    }
}

module.exports = (str) => {
    const nc = {
        max: 0,
        maxkeys: {}
    };
    for (let i = 0; i < str.length; i++) {
        if (!isNaN(str[i])) {
            let j = i + 1;
            for (; j < str.length; j++) {
                if (isNaN(str[j])) break;
            }
            for (let k = i; k < j; k++) {
                for (let m = 1; m <= j - k; m++) {
                    insert(nc, str.substr(k, m));
                }
            }
            i = j;
        }
    }
    let sum = 0;
    Object.keys(nc.maxkeys).map((key) => {
        sum += key * nc.max;
    });
    return sum;
};