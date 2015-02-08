var _ = require('highland');
var oboe = require('oboe');

var i = 1;
var stream = _(function(push, next) {
	push(null, i);
	if (i > 5) {
		push(null, _.nil);
		return;
	}
	i++;
	setTimeout(next, 250);
});

var through = _.pipeline(
	_.map(function(value) {
		console.log(value);
		return value;
	})
);

// stream.pipe(through).toArray(function(array) {
// 	console.log("array", array);
// });

var from = require('from2-array')
var through = require('through2')

var stream = from.obj([{
	name: 'a'
}, {
	name: 'b'
}, {
	name: 'c'
}]);

var throughb = through.obj(function(chunk, enc, cb) {
	// console.log('found: ' + chunk.name)
	cb();
});

var transform = require('to-transform');
var tr = transform(function(x) {
	console.log(x);
	return x;
});

var stream3 = stream.pipe(tr);

// process.nextTick(function(){
// 	stream3.pipe(process.stdout);
// });




// oboe(stream)
// 	.on('node:*', function() {
// 		console.log(arguments);
// 	})
// 	.on('done', function() {
// 		console.log("*twiddles mustache*");
// 	})
// 	.on('fail', function() {
// 		console.log("Drat! Foiled again!");
// 	});