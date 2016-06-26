const fs = require('fs');
const path = require('path');

var completedTasks = 0,
    tasks = [],
    wordCounts = {};

function checkIfComplete() {
    completedTasks++;
    if (completedTasks === tasks.length) {
        for (var key in wordCounts) {
            console.log(`${key} : ${wordCounts[key]}`);
        }
    }
}

function countWordsInText(text) {
    var words = text.toString().toLowerCase().split(/\W+/).sort();
    words.map((word) => {
        wordCounts[word] = wordCounts[word] ? wordCounts[word] + 1 : 1;
    });
}

fs.readdir(__dirname, (err, files) => {
    if (err) throw err;
    files.map((file) => {
        tasks.push(function(file) {
            return function() {
                fs.readFile(file, (err, text) => {
                    if (err) throw err;
                    countWordsInText(text);
                    checkIfComplete();
                });
            };
        }(file));
    });
    tasks.map((task) => {
        task();
    });
});