var _ = require('highland');

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

stream.pipe(through).toArray(function(array) {
	console.log("array", array);
});