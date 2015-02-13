var http = require("http");
var fs = require("fs");
var jsonstreamify = require("jsonstreamify");
var utils = require("./utils.js");
var ObjectStream = jsonstreamify.ObjectStream;
var ArrayStream = jsonstreamify.ArrayStream;

ArrayStream.prototype.startItem = function() {
    this.push("\n");
};

var server = http.createServer();

server.on("request", function(req, res) {
    var readStream;
    var file;
    switch (req.url) {
        case "/":
            file = "index.html";
            break;
        case "/oboe-browser.js":
            file = "node_modules/oboe/dist/oboe-browser.js";
            break;
        case "/semantic.min.css":
            file = "node_modules/semantic-ui/dist/semantic.min.css";
            break;
        case "/users.json":
            readStream = createUserStream();
            break;
        default:
            res.statusCode = 404;
            res.statusMessage = "Not found.";
    }
    if (file) {
        readStream = fs.createReadStream(file);
    }
    if (readStream) {
        readStream.pipe(res);
        return;
    }
});

function createUserStream() {
    var obj = new ObjectStream();
    var arr = new ArrayStream();
    var count;
    var index = 0;
    while (index < 25) {
        setTimeout(function() {
            arr.write(utils.getFakeUser());
            count = ~~count + 1;
            if (count >= index) {
                arr.finish();
            }
        }, index * 50);
        index++;
    }
    obj.write("count", index);
    obj.write("rows", arr);
    obj.finish();
    return obj;
}

server
    .listen(8080, function() {
        console.log("Listening server: http://localhost:8080");
    });