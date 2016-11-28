export default function combineRegExp() {
	var value, arr = [], regStr
	for (value of arguments) {
		arr.push(value.source)
	}
	regStr = '(' + arr.join('|') + ')'
	return new RegExp(regStr, 'g')
}
