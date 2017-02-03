const validate = require('./validate')

function validatePost(post) {
	validate.checkNotEmpty(post.username)
	validate.checkNotEmpty(post.text)
	validate.checkNotEmpty(post.category)
}
