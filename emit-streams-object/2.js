var streamify = require('stream-array'),
    os = require('os');
var stringify = require('streaming-json-stringify');
var oboe = require('oboe');

var src = [
      {"name":"aubergine",    "colour":"purple"},
      {"name":"apple",        "colour":"red"},
      {"name":"nuts",         "colour":"brown"}
];

var rs = streamify(src)
    .pipe(stringify())
    // .pipe(process.stdout)
    // .pipe(process.stdout)

var request = require("request");
var JSONStream = require("JSONStream");
var es = require("event-stream");

var logger = es.map(function (data, callback) {
    console.log(data);
    callback(null, data)
});

// request({url: "http://isaacs.couchone.com/registry/_all_docs"})
//     .pipe(JSONStream.parse("name.*"))
//     .pipe(logger);

//rs = request({url: "http://isaacs.couchone.com/registry/_all_docs"});
rs = "http://isaacs.couchone.com/registry/_all_docs";


oboe(rs)
    .on('node:rows.*', function(node, path, ancestors) {
        console.log(node, path);
    })
    .on('done', function() {
        console.log("done");
    })
    .on('fail', function() {
        console.log("Drat! Foiled again!");
    });
