<template>
	<div class="a-navigator">
		<div class="logo">LOGO</div>
		<div class="title">Anonymous</div>
		<div class="btn-group">
			<c-button color="ghost" icon="search"></c-button>
			<c-button color="ghost" icon="email"></c-button>
			<c-button color="ghost" icon="account_circle"></c-button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'a-navigator'
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
