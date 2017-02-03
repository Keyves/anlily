const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reportSchema = new Schema({
	suspectid: {
		type: Number,
		ref: 'User'
	},
	reporterid: {
		type: Number,
		ref: 'User'
	},
	postid: {
		type: Number,
		ref: 'Post'
	},
	commentid: {
		type: Number,
		ref: 'Comment'
	},
	// ['色情', '辱骂', '广告', '其它']
	type: String,
	description: String,
	createdTime: {
		type: Date,
		default: Date.now
	}
})

module.exports = reportSchema

/*
1. 举报函创建、删除、替换文本、
1. 举报函排版
1. 单个文章详细排版
1. 被举报通过3次，用户封禁3天，举报5次，封禁7天，总次数举报10次，永久封禁
1. 无账号者封禁ip

组件：
按钮、菜单（弹出）、对话框、图片选择器

＊文本编辑＊

 */
