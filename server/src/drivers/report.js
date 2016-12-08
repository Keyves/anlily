const ReportModel = require('../models/report')
const postDriver = require('./post')

const reportDriver = {
	async findOneByReportid(reportid) {
		try {
			const report = await ReportModel.findOne({reportid})
			if (report) {
				return report
			} else {
				throw new Error('该举报函不存在')
			}
		} catch(e) {
			e.message = `find one by report id failed - ${e.message}`
			throw e
		}
	},

	async findByLimited() {
		try {
			const reports = await ReportModel.find()
			if (reports && reports.length > 0) {
				return reports
			} else {
				throw new Error('举报函不存在')
			}
		} catch(e) {
			e.message = `find report failed - ${e.message}`
			throw e
		}
	},

	async insert(report) {
		try {
			return new ReportModel(report).save()
		} catch(e) {
			e.message = `insert report failed - ${e.message}`
			throw e
		}
	},

	async removeByReportid(reportid) {
		try {
			await ReportModel.remove({_id: reportid})
		} catch(e) {
			e.message = `delete report failed - ${e.message}`
			throw e
		}
	},

	async updatePostByReportid(reportid) {
		try {
			const report = await reportDriver.findOneByReportid(reportid)
			const post = await postDriver.findOneByPostid(report.postid)
			post.text = `因违反社区关于[${report.type}]的规定，内容被删除`
			await post.save()
		} catch(e) {
			e.message = `update post by report failed - ${e.message}`
			throw e
		}
	}
}

module.exports = reportDriver
