
var fs = require('fs');
var data = fs.readFileSync('words.json');
var words = JSON.parse(data);
console.log(words);

console.log("server is starting");

var express = require('express');

var app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Starting server at ' + port);
});

function listening() {
    console.log("listening");
}

app.use(express.static('website'));

app.get('/all', sendAll);

function sendAll(request, response) {
    response.send(words);
}

app.get('/search/:word', searchWord);

function searchWord(request, response) {
    var word = request.params.word;
    var reply;

    if  (words[word]) {
        reply = {
            status: "found",
            word: word,
            score: words[word]
        }
    } else {
        reply = {
            status: "not found",
            word: word
        }
    }
    response.send(reply); 
}