<template>
	<div class="a-report-waterfall" ref="waterfall">
		<div class="col" v-for="reports in cols">
			<a-report
				class="report"
				v-for="report in items"
				:admin="admin"
				:suspectid="report.suspectid"
				:reporterid="report.reporterid"
				:postid="report.postid"
				:type="report.type"
				:description="report.description"
				:text="report.text"
				:createdTime="report.createdTime"
				@revoke="revokeReportFetch(report._id)"
				@invoke="invokeReportFetch(report._id)"
				>
			</a-report>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { throttle } from 'src/utils'
import Waterfall from 'src/containers/mixins/Waterfall'
import roles from 'src/conf/roles'
import DateLib from 'src/lib/DateLib'
import Report from './Report'

export default {
	name: 'a-report-waterfall',
	computed: {
		...mapState(['reports']),
		...mapState({
			role: state => state.user.role
		}),
		admin() {
			return this.role === roles.SUPER_ADMIN
		},
		items() {
			return this.reports
		}
	},
	mixins: [Waterfall],
	methods: {
		...mapActions(['revokeReportFetch', 'invokeReportFetch'])
	},
	components: {
		'a-report': Report
	}
}
</script>
<style lang="scss">
@import "~src/variables";

.a-report-waterfall {
	overflow: hidden;
	display: flex;
	min-width: 500px;
	justify-content: center;

	& > .col {
		width: 50%;
		min-width: 500px;
		overflow: hidden;
	}
}
</style>
