var faker = require('faker');

module.exports = function() {
	var o = {
		name: faker.name.findName(),
		email: faker.internet.email(),
		phone: faker.phone.phoneNumber(),
		city: faker.address.city()
	};
	return o;
};