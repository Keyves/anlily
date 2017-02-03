import Post from './Post'
import Comment from './Comment'
import Editor from './Editor'
import Waterfall from './Waterfall'
import Detail from './Detail'

Post.Comment = Comment
Post.Editor = Editor
Post.Waterfall = Waterfall
Post.Detail = Detail

export {
	Comment,
	Editor,
	Waterfall,
	Detail
}

export default Post
