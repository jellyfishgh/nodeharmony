"use strict"

let obj = {
    hello: 'world',
    foo1() {
        let bar = () => {
            return this.hello;
        }
        return bar;
    },
    foo2() {
        return function(){
            return this.hello;
        }  
    }
}

var bar = {
    hello: 'es6',
    bar1: obj.foo1(),
    bar2: obj.foo2()
}

console.log(bar.bar1());// world
console.log(bar.bar2());// es6