var from = require("read-stream/array");
var to = require("write-stream/array");
var transform = require("transform-stream");

var tr = transform(function(item, done) {
	setTimeout(function() {
		done(null, item);
	}, 250);
});

var fr = from(["1", "2", "3"]);

// fr.pipe(tr).pipe(process.stdout);

// while(c = fr.read()) {
// 	console.log(c);
// }
// console.log(fr);

fr.pipe(tr).pipe(to(function(list) {
	console.log("list", list)
}));