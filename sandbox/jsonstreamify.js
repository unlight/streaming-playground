var jsonstreamify = require('jsonstreamify');
var ObjectStream = jsonstreamify.ObjectStream;

var Stringify = require('streaming-json-stringify');
var JSONStream = require("JSONStream");

var obj = new ObjectStream();

var read = require("./read3");

obj.write('users', read);
obj.finish();
obj
	// .pipe(Stringify())
	.pipe(process.stdout);