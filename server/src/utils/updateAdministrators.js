const userDriver = require('../drivers/user')
const UserModel = require('../models/user')

module.exports = async function (admins, {role}) {
	let admin
	await UserModel.remove({role})
	for (admin of admins) {
		admin.role = role
		await userDriver.register(admin)
	}
}
