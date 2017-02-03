const htmlparser = require('htmlparser2')

function parseHTML(text) {
	return new Promise((resolve, reject) => {
		var handler = new htmlparser.DomHandler((err, doms) => {
			err && reject(err)
			resolve(doms)
		})
		const parser = new htmlparser.Parser(handler)
		parser.write(text)
		parser.end()
	})
}

module.exports = parseHTML
