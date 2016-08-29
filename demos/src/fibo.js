"use strict"

function* fibo() {
    let [a, b] = [1, 1]
    yield a
    yield b
    while(true){
        [a, b] = [b, a+b]
        yield b
    }
}

var gen = fibo();

for(var i = 0; i < 10; i++){
    console.log(gen.next().value)
}