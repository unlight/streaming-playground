var read = require("./read2");
var Stringify = require('streaming-json-stringify');
var JSONStream = require("JSONStream");

read
	// .pipe(Stringify())
	.pipe(JSONStream.stringify())
	.pipe(process.stdout)