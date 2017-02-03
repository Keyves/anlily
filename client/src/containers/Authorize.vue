<template>
	<div class="a-authorize" v-show="authorizeVisible">
		<div class="a-authorize-bg" @click="toggleAuthorizeVisible"></div>
		<div class="form">
			<div class="switch">
				<c-button class="btn" icon="swap_horiz"></c-button>
			</div>
			<input
				class="form-item"
				type="text"
				placeholder="邮箱"
				:value="user.email"
				@input="changeEmailText($event.target.value)"
			>
			<input
				class="form-item"
				type="password"
				placeholder="密码"
				:value="user.password"
				@input="changePasswordText($event.target.value)"
			>
			<div class="login" v-show="this.mode === 'login'">
				<c-button class="form-item btn" color="primary" @click="login(user)">登录</c-button>
			</div>
			<div class="register" v-show="this.mode === 'register'">
				<input
					class="form-item"
					type="password"
					placeholder="重复密码"
					@input="changePasswordRepeatText($event.target.value)"
				>
				<c-button class="form-item btn" color="primary" :disabled="disabledRegister" @click="register(user)">注册</c-button>
			</div>
			<div class="help">
				<c-button class="btn" color="ghost">忘记密码？</c-button>
				<c-button class="btn secondary" color="ghost" @click="switchMode" v-show="this.mode === 'login'">创建帐号</c-button>
				<c-button class="btn secondary" color="ghost" @click="switchMode" v-show="this.mode === 'register'">已有账号</c-button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	name: 'a-authorize',
	data() {
		return {
			mode: 'login',
			disabledRegister: true
		}
	},
	computed: {
		...mapState(['user']),
		...mapState({
			authorizeVisible: state => state.status.authorizeVisible
		})
	},
	methods: {
		...mapActions([
			'changeUsernameText',
			'changeEmailText',
			'changePasswordText',
			'toggleAuthorizeVisible',
			'enterUserinfoFetch',
			'login',
			'register',
			'getLoginedUser'
		]),
		changePasswordRepeatText(value) {
			this.disabledRegister = value !== this.user.password
		},
		switchMode() {
			this.mode = this.mode === 'login' ? 'register' : 'login'
		}
	},
	created() {
		this.getLoginedUser()
	}
}
</script>

<style lang="scss">
@import "~src/variables";

.a-authorize {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 50;

	&-bg {
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.25);
	}

	& > .form {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		width: 250px;
		padding: 20px;
		background-color: #f5f5f5;
		border-radius: 5px;
		box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);

		.form-item {
			width: 100%;
			font-size: 13px;
			margin: 5px 0;
			border-radius: 2px;
    		box-sizing: border-box;

			&input {
				padding: 20px 10px;
			}

			&.btn {
				padding: 8px 0;
				font-size: 14px;
				border-radius: 5px;
			}
		}

		& > .switch {
			display: flex;
			flex-direction: column;
			align-items: center;

			& > .btn {
				padding: 20px;
				margin: 20px 0;
				font-size: 30px;
				border-radius: 50%;
				color: white;
				background: #c5c5c5;
			}
		}

		& > .help {
			display: flex;
			justify-content: space-between;

			& > .btn {
				color: $color-primary;
				padding: 0;
			}
		}
	}
}

</style>
