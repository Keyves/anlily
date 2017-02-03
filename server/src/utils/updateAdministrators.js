const userDriver = require('../drivers/user')
const UserModel = require('../models/user')

// 考虑到message的原因，故设计为可增不可减
module.exports = async function (newAdmins, {role}) {
	let admin, _user, oldAdmins, filterAdmins, newAdminids
	for (admin of newAdmins) {
		if (admin._id < 10000 || admin._id > 99999) {
			throw new Error('管理员_id超出范围')
		}
		try {
			admin.role = role
			await userDriver.register(admin)
		} catch(e) {
			try {
				_user = await userDriver.updatePasswordByUserid(admin._id, admin.password)
				_user.role = role
				_user.email = admin.email
				_user.locked = false
				await _user.save()
			} catch(e) {
				throw new Error('管理员信息更新失败')
			}
		}
	}

	newAdminids = newAdmins.map(v => v._id)
	// 将旧管理员组和新管理员组交叉比对，得出不存在于新管理组的旧管理员帐号，并将其锁定
	oldAdmins = await UserModel.find({role})
	filterAdmins = oldAdmins.filter(v => !newAdminids.includes(v._id))
	filterAdmins.forEach(async v => {
		v.locked = true
		await v.save()
	})
}
