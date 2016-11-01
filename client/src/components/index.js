import './common.scss'
import Button from './Button'
import Icon from './Icon'
import Post from './Post'
import Menu from './Menu'
const Comment = Post.Comment
const MenuItem = Menu.Item

export default {
    install(Vue) {
        Vue.component(Button.name, Button)
        Vue.component(Icon.name, Icon)
		Vue.component(Post.name, Post)
		Vue.component(Comment.name, Comment)
		Vue.component(Menu.name, Menu)
		Vue.component(MenuItem.name, MenuItem)
    }
}
