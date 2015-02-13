var faker = require("faker");

function getFakeUser() {
	var o = {
		name: faker.name.findName(),
		email: faker.internet.email(),
		phone: faker.phone.phoneNumber(),
		city: faker.address.city(),
		address: faker.address.streetAddress()
	};
	return o;
};

module.exports = {
	getFakeUser: getFakeUser
};