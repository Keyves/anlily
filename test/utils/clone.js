const slice = Array.prototype.slice
const assign = Object.assign

function clone() {
	var args = slice.call(arguments)
	args.unshift({})
    return JSON.parse(JSON.stringify(assign.apply(Object, args)))
}

module.exports = clone
