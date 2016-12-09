<template>
	<div class="container">
		<a-navigator></a-navigator>
		<div class="container-content">
			<a-sidebar class="content-sidebar"></a-sidebar>
			<a-post-waterfall :column="2" v-show="!reportWaterfallVisible"></a-post-waterfall>
			<a-report-waterfall :column="2" v-show="reportWaterfallVisible"></a-report-waterfall>
		</div>
		<a-post-editor></a-post-editor>
		<c-notification></c-notification>
		<a-authorize></a-authorize>
		<a-report-editor></a-report-editor>
	</div>
</template>

<script lang="babel">
import { mapState } from 'vuex'
import SideBar from './SideBar'
import Navigator from './Navigator'
import { Editor as PostEditor, Waterfall as PostWaterfall } from './Post'
import { Editor as ReportEditor, Waterfall as ReportWaterfall } from './Report'
import Authorize from './Authorize'

export default {
	computed: mapState({
		reportWaterfallVisible: state => state.status.category === '值班室'
	}),
	components: {
		'a-sidebar': SideBar,
		'a-navigator': Navigator,
		'a-authorize': Authorize,
		'a-post-editor': PostEditor,
		'a-post-waterfall': PostWaterfall,
		'a-report-editor': ReportEditor,
		'a-report-waterfall': ReportWaterfall
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
