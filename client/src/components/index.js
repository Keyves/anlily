import './common.scss'
import Button from './Button'
import Icon from './Icon'
import Notification from './Notification'
import Menu from './Menu'
import At from './At'
const Notice = Notification.Notice
const MenuItem = Menu.Item
const Caret = At.Caret

export {
	Button,
	Icon,
	Menu,
	MenuItem,
	Notification,
	Notice,
	At,
	Caret
}

export default {
    install(Vue) {
        Vue.component(Button.name, Button)
        Vue.component(Icon.name, Icon)
		Vue.component(Menu.name, Menu)
		Vue.component(MenuItem.name, MenuItem)
		Vue.component(Notification.name, Notification)
		Vue.component(Notice.name, Notice)
		Vue.component(At.name, At)
		Vue.component(Caret.name, Caret)
    }
}
