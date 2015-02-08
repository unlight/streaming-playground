var jsonstreamify = require('jsonstreamify');
var ObjectStream = jsonstreamify.ObjectStream;
var ArrayStream = jsonstreamify.ArrayStream;
var getFakeObject = require("./getFakeObject");

var obj = new ObjectStream();

var arr = new ArrayStream();
(function() {
	var i = 0;
	setTimeout(() => arr.write(getFakeObject()), ++i * 250);
	setTimeout(() => arr.write(getFakeObject()), ++i * 250);
	setTimeout(() => arr.write(getFakeObject()), ++i * 250);
	setTimeout(() => {
		arr.write(getFakeObject());
		arr.finish();
	}, ++i * 250);
})();

obj.write('count', 5);
obj.write('rows', arr);

obj.finish();

var oboe = require("oboe");

oboe(obj)
	.node('count', function(node, path, anc) {
		console.log(node);
	})
	.path('rows', function(node, path) {
		console.log("rows found");
	})
	.node('rows.*', function(node, path) {
		console.log(node);
	})
	.done(function(model) {
		console.log("Done");
		console.log(arguments);
	})
	.on('done', function(m) {
		console.log("Done");
		console.log(m);
	})
	.fail(console.error)

// obj.pipe(process.stdout);