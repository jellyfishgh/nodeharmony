'use strict'

let obj1 = {
    foo: 'bar1',
    f1: () => {
        return this.foo;
    }
}

let foo = 'bar2';

obj1.f2 = () => {
    return this.foo;
}

console.log(obj1.f1() === obj1.f2());