import Notification from './Notification'
import Notice from './Notice'

export const queue = []

Notification.Notice = Notice
Notification.notice = function(messageOrOpts) {
	const opts = typeof messageOrOpts === 'string' ? {
		message: messageOrOpts
	} : messageOrOpts

	queue.push(opts)
}
window.notice = Notification.notice

export default Notification
