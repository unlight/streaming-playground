var Readable = require('stream').Readable;
var util = require('util');
util.inherits(Counter, Readable);

var faker = require('faker');

function Counter(opt) {
	Readable.call(this, opt);
	this._max = 5;
	this._index = 1;
	this._getFakeObject = function() {
		var o = {
			name: faker.name.findName(),
			email: faker.internet.email(),
			phone: faker.phone.phoneNumber(),
			city: faker.address.city()
		};
		o.toString = function() {
			return JSON.stringify(this);
		};
		return o;
	};
}

Counter.prototype._read = function() {
	var i = this._index++;
	if (i > this._max) {
		this.push(null);
	} else {
		var self = this;
		// var o = JSON.stringify(this._getFakeObject());
		var o = this._getFakeObject();
		setTimeout(() => {
			self.push(o);
		}, 250);
	}
};

module.exports = new Counter({
	objectMode: true
});