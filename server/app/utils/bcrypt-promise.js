const bcrypt = require('bcrypt')

const bcryptPromise = {}

;['genSalt', 'hash', 'compare'].forEach(key => {
	bcryptPromise[key] = function() {
		const args = Array.prototype.slice.call(arguments)
		return new Promise((resolve, reject) => {
			args.push((err, data) => {
				if (err) {
					reject(err)
				} else {
					resolve(data)
				}
			})
			bcrypt[key].apply(this, args)
		})
	}
})

module.exports = bcryptPromise
