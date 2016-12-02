function refine(data, keys) {
	const newData = {}
	let i, len, key
	for (i = 0, len = keys.length; i < len; i++) {
		key = keys[i]
		newData[key] = data[key]
	}
	return newData
}

module.exports = refine
