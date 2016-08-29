"use strict"

import fs from 'fs'
import path from 'path'
import readline from 'readline'

function readLineInFile(filename, callback = noop, complete = noop){
    let rl = readline.createInterface({
        input: fs.createReadStream(path.resolve(__dirname, filename))
    })
    rl.on('line', line => {
        callback(line)
    })
    rl.on('close', complete)
    return rl
}

function noop() {return false}

readLineInFile('arrow.js', line => {
    console.log(line)
})