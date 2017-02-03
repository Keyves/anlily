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

export default Notification
