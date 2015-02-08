var h = require('highland');
var ReadableStream = require("stream").Readable;
var Stream = require("stream");

var stream = h([
    1,
    2,
    3
]);

var through = h.pipeline(
    h.map(function(value) {
        console.log(value);
        return value;
    })
);

stream.pipe(through).toArray(function(array) {
	console.log("array", array);
});