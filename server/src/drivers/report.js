const ReportModel = require('../models/report')
const userDriver = require('./user')

const reportDriver = {
	async findByLimited() {
		try {
			const report = await ReportModel.find()
			if (!report) {
				throw new Error('举报函不存在')
			} else {
				return report
			}
		} catch(e) {
			e.message = `find report failed - ${e.message}`
			throw e
		}
	},

	async insert(report) {
		try {
			const _report = await new ReportModel(report)
			await _report.save()
			return _report
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
	}
}

module.exports = reportDriver
