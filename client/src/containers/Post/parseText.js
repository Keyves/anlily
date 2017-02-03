const RE = /(@|#|img|emo)\[((?:.|\s)+?)\]/g
const atRE = /^((?:.|\s)+):(\d*)$/
const anchorRE = /^(\d+):(\d*)$/
const imgRE = /https?[^\?]+\.(?:gif|png|jpe?g|bpm|tif|webp)$/
const emoLinkMap = {
	weixiao: 'http://emotion.jpg'
}

export default function parseText(string) {
	var start = 0, tokens = [], index, value

	function tearString(start, end) {
		if (end > start) {
			tokens.push({
				type: 'text',
				value: string.substring(start, end)
			})
		}
	}

	string.replace(RE, function(str, type, content) {
		index = arguments[arguments.length - 2]

		// 拆分出默认起始位到当前匹配的起始下标位的字符串
		tearString(start, index)

		content = content.trim()
		switch(type) {
			case '@':
				value = content.match(atRE)
				type = value ? 'at' : 'text'
				value = value ? {
					username: value[1],
					userid: value[2]
				} : str
				break
			case '#':
				value = content.match(anchorRE)
				type = value ? 'anchor' : 'text'
				value = value ? {
					commentid: value[1],
					userid: value[2]
				} : str
				break
			case 'img':
				value = imgRE.test(content) && content
				type =  value ? 'image' : 'text'
				value = value ? value : str
				break
			case 'emo':
				value = emoLinkMap[content]
				type = value ? 'image' : 'text'
				value = value ? value : str
				break
			default:
				type = 'text'
				value = str
		}

		tokens.push({
			type,
			value
		})
		// 默认起始位调整为当前字符串最后一位所处原始字符串的下标
		start = index + str.length
	})

	// 补充末尾
	tearString(start, string.length)

	return tokens
}
