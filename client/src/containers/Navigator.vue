<template>
	<div class="a-navigator">
		<div class="logo">AC</div>
		<div class="title">Anonymous</div>
		<div class="btn-group" v-show="logined">
			<c-button color="ghost" icon="search"></c-button>
			<c-popover ref="messages" position="bottom center">
				<div v-for="message in messages" @click="getPostDetailFetch(message.postid)">
					来自用户 {{message.from}} 的 {{message.type}} 信息
				</div>
			</c-popover>
			<c-button v-popover:messages color="ghost" icon="email">{{messages.length || ''}}</c-button>
			<c-button color="ghost" icon="settings"></c-button>
			<c-button color="ghost" @click="logout">LOGOUT</c-button>
		</div>
		<div class="btn-group" v-show="!logined">
			<c-button color="ghost" icon="account_circle" @click="toggleAuthorizeVisible"></c-button>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	name: 'a-navigator',
	computed: mapState({
		logined: state => state.status.logined,
		messages: state => state.user.messages || []
	}),
	methods: {
		...mapActions(['toggleAuthorizeVisible', 'logout', 'getPostDetailFetch'])
	}
}
</script>
<style lang="scss">
@import "~src/variables";

.a-navigator {
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	width: 100%;
	height: 50px;
	padding: 0 20px;
	color: white;
	background: #db4437;
	box-shadow: 0 0 5px $shadow-color;
	box-sizing: border-box;
	z-index: 20;

	& > .logo {

	}

	& > .title {
		flex: 1;
		padding: 0 50px;
	}

	& > .btn-group {
		display: flex;
	}
}
</style>
