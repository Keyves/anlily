<template>
	<div class="container">
		<a-navigator></a-navigator>
		<div class="container-content">
			<a-sidebar class="content-sidebar"></a-sidebar>
			<a-waterfall :column="2"></a-waterfall>
		</div>
		<a-post-editor></a-post-editor>
		<c-notification></c-notification>
		<a-authorize></a-authorize>
		<!-- <a-report
			:suspectid="100012"
			:reporterid="1000111"
			:postid="10001"
			type="广告"
			description="内容包含了广告"
			text="what the fuck"
			:createdTime="new Date().toString()"
			>
		</a-report> -->
		<a-report-editor></a-report-editor>
	</div>
</template>

<script lang="babel">
import SideBar from './SideBar'
import Navigator from './Navigator'
import { Editor as PostEditor } from './Post'
import Report, { Editor as ReportEditor } from './Report'
import Waterfall from './Waterfall'
import Authorize from './Authorize'

export default {
	components: {
		'a-sidebar': SideBar,
		'a-navigator': Navigator,
		'a-waterfall': Waterfall,
		'a-authorize': Authorize,
		'a-report': Report,
		'a-post-editor': PostEditor,
		'a-report-editor': ReportEditor
	}
}
</script>

<style lang="scss" scoped>
@import "~src/variables";

.container {
    &-content {
        margin-top: 60px;

		.content {
		    &-sidebar {
		        float: left;
		    }
		}
    }
}
</style>
