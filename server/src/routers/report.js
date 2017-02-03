const router = require('koa-router')()
const refine = require('../utils/refine')
const requireRole = require('../utils/requireRole')
const reportDriver = require('../drivers/report')
const { roles } = require('../../conf')

router
.get('/', async (ctx) => {
	const reports = await reportDriver.findByLimited()
	ctx.body = reports
})
.post('/', async (ctx) => {
	const report = refine(ctx.request.body, ['suspectid', 'postid', 'commentid', 'type', 'description', 'text'])
	const user = ctx.session.user

	report.reporterid = user._id

	const _report = await reportDriver.insert(report)
	ctx.body = refine(_report, ['createdTime'])
})
.del('/', requireRole(roles.SUPER_ADMIN), async (ctx) => {
	const reportid = ctx.query.reportid
	await reportDriver.removeByReportid(reportid)
	ctx.status = 200
})
.del('/invoke', requireRole(roles.SUPER_ADMIN), async (ctx) => {
	const reportid = ctx.query.reportid
	await reportDriver.updatePostByReportid(reportid)
	ctx.status = 200
})

module.exports = router
