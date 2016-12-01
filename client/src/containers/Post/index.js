import Post from './Post'
import Comment from './Comment'
import Editor from './Editor'
Post.Comment = Comment
Post.Editor = Editor

export {
	Comment,
	Editor
}

export default Post
