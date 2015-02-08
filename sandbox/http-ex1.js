var http = require('http');
var jsonstreamify = require('jsonstreamify');
var ObjectStream = jsonstreamify.ObjectStream;
var ArrayStream = jsonstreamify.ArrayStream;
var getFakeObject = require("./getFakeObject");

ArrayStream.prototype.startItem = function() {
	this.push("\n");
};

var server = http.createServer();
server.on("request", function(req, res) {

	if (req.url == "/demo.html" || req.url == "/node_modules/oboe/dist/oboe-browser.js") {
		require("fs").createReadStream("./.." + req.url).pipe(res);
		return;
	}

	var obj = new ObjectStream();
	var arr = new ArrayStream();
	// res.writeHead(200, {'Content-Type': 'text/plain' });
	(function() {
		var i = 0;
		setTimeout(() => {
			arr.write(getFakeObject());
			// res.write("\n");
			// res.flush({end: false});
		}, ++i * 500);
		setTimeout(() => arr.write(getFakeObject()), ++i * 500);
		setTimeout(() => arr.write(getFakeObject()), ++i * 500);
		setTimeout(() => arr.write(getFakeObject()), ++i * 500);
		setTimeout(() => {
			arr.write(getFakeObject());
			arr.finish();
		}, ++i * 500);
	})();

	obj.write('count', 5);
	obj.write('rows', arr);

	obj.finish();

	// res.connection._writableState.objectMode = true;
	// res.connection._writableState.highWaterMark = 2;
	// res.connection._readableState.highWaterMark = 2;
	// res.connection._readableState.objectMode = true;
	// res.socket._writableState.highWaterMark = 2;
	// res.socket._readableState.highWaterMark = 2;
	// res.socket._readableState.objectMode = true;
	// res.socket._writableState.objectMode = true;
	// console.log(res);
	obj.pipe(res);
});
server.listen(8080);