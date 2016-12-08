import Post from './Post'
import Comment from './Comment'
import Editor from './Editor'
import Waterfall from './Waterfall'

Post.Comment = Comment
Post.Editor = Editor
Post.Waterfall = Waterfall

export {
	Comment,
	Editor,
	Waterfall
}

export default Post
