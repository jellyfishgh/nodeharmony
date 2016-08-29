const fs = require('fs');
const request = require('request');
const htmlparser = require('htmlparser');
const path = require('path');

const configFileName = 'rssFeeds.txt';

function checkForRSSFile() {
    fs.exists(path.join(__dirname, configFileName), (exists) => {
        if (!exists) throw next(new Error(`Missing RSS File: ${configFileName}`));
        next(null, configFileName);
    });
}

function readRSSFile(configFileName) {
    fs.readFile(path.join(__dirname, configFileName), (err, feedList) => {
        if (err) return next(err);
        feedList = feedList.toString().replace(/^\s+|\s+$/g, '').split('\n');
        var random = Math.floor(Math.random() * feedList.length);
        next(null, feedList[random]);
    });
}

function downloadRSSFeed(feedUrl) {
    request({
        uri: feedUrl
    }, (err, res, body) => {
        if (err) return next(err);
        if (res.statusCode != 200) {
            return next(new Error('Abnormal response status code'));
        }
        next(null, body);
    });
}

function parseRSSFeed(rss) {
    const handler = new htmlparser.RssHandler();
    const parser = new htmlparser.Parser(handler);
    parser.parseComplete(rss);
    if (!handler.dom.items.length) {
        return next(new Error('No RSS itmes found'));
    }
    var item = handler.dom.items.shift();
    console.log(`${item.title}\n${item.link}`);
}

var tasks = [
    checkForRSSFile,
    readRSSFile,
    downloadRSSFeed,
    parseRSSFeed
];

function next(err, result) {
    if (err) throw err;
    var currentTask = tasks.shift();
    if (currentTask) {
        currentTask(result);
    }
}
next();