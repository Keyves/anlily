<template>
	<div class="container">
		<a-navigator></a-navigator>
		<div class="container-content">
			<a-sidebar class="content-sidebar"></a-sidebar>
			<a-waterfall :column="2"></a-waterfall>
		</div>
		<a-editor></a-editor>
		<c-notification></c-notification>
		<a-authorize></a-authorize>
	</div>
</template>

<script lang="babel">
import SideBar from './SideBar'
import Navigator from './Navigator'
import Editor from './Editor'
import Waterfall from './Waterfall'
import Authorize from './Authorize'

export default {
	components: {
		'a-sidebar': SideBar,
		'a-navigator': Navigator,
		'a-editor': Editor,
		'a-waterfall': Waterfall,
		'a-authorize': Authorize
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
