<template>
<div class="sidebar">
	<c-menu text="综合">
		<c-menu-item>综合版1</c-menu-item>
		<c-menu-item>欢乐恶搞</c-menu-item>
		<c-menu-item>综合版1</c-menu-item>
		<c-menu-item>欢乐恶搞</c-menu-item>
		<c-menu-item>推理(脑洞)</c-menu-item>
		<c-menu-item>技术(IT)</c-menu-item>
		<c-menu-item>美食(汪版)</c-menu-item>
		<c-menu-item>喵版</c-menu-item>
		<c-menu-item>音乐</c-menu-item>
		<c-menu-item>校园(考试)</c-menu-item>
		<c-menu-item>科学(理学)New!</c-menu-item>
		<c-menu-item>小说(连载)</c-menu-item>
		<c-menu-item>买买买双十一</c-menu-item>
		<c-menu-item>绘画涂鸦(二创)</c-menu-item>
		<c-menu-item>姐妹(淑女)</c-menu-item>
		<c-menu-item>女性向(基腐)</c-menu-item>
		<c-menu-item>数码</c-menu-item>
		<c-menu-item>女装(时尚)</c-menu-item>
		<c-menu-item>日记(树洞)</c-menu-item>
		<c-menu-item>圈内</c-menu-item>
		<c-menu-item>都市怪谈</c-menu-item>
		<c-menu-item>速报</c-menu-item>
	</c-menu>
	<c-menu text="二次元">
		<c-menu-item>动画</c-menu-item>
		<c-menu-item>漫画</c-menu-item>
		<c-menu-item>美漫(小马)</c-menu-item>
		<c-menu-item>国漫</c-menu-item>
		<c-menu-item>轻小说</c-menu-item>
		<c-menu-item>GALGAME</c-menu-item>
		<c-menu-item>东方Project</c-menu-item>
		<c-menu-item>舰娘</c-menu-item>
		<c-menu-item>LoveLive</c-menu-item>
		<c-menu-item>VOCALOID</c-menu-item>
		<c-menu-item>文学(推书)</c-menu-item>
	</c-menu>
	<c-menu text="游戏">
		<c-menu-item>游戏综合版</c-menu-item>
		<c-menu-item>守望先锋</c-menu-item>
		<c-menu-item>DNF</c-menu-item>
		<c-menu-item>炉石传说</c-menu-item>
		<c-menu-item>手游New!</c-menu-item>
		<c-menu-item>任天堂NX!</c-menu-item>
		<c-menu-item>Steam</c-menu-item>
		<c-menu-item>索尼</c-menu-item>
		<c-menu-item>LOL</c-menu-item>
		<c-menu-item>DOTA</c-menu-item>
		<c-menu-item>WOW</c-menu-item>
		<c-menu-item>精灵宝可梦</c-menu-item>
		<c-menu-item>EVE</c-menu-item>
		<c-menu-item>战争雷霆</c-menu-item>
		<c-menu-item>坦克战机战舰世界</c-menu-item>
		<c-menu-item>Minecraft</c-menu-item>
		<c-menu-item>怪物猎人</c-menu-item>
		<c-menu-item>辐射4</c-menu-item>
		<c-menu-item>D3</c-menu-item>
		<c-menu-item>卡牌桌游</c-menu-item>
		<c-menu-item>音乐游戏</c-menu-item>
		<c-menu-item>AC大逃杀</c-menu-item>
	</c-menu>
	<c-menu text="2.5次元">
		<c-menu-item>日本偶像(AKB)</c-menu-item>
		<c-menu-item>中国偶像(SNH)</c-menu-item>
		<c-menu-item>眼科(Cosplay)</c-menu-item>
		<c-menu-item>声优</c-menu-item>
		<c-menu-item>模型(手办)</c-menu-item>
	</c-menu>
	<c-menu text="3次元">
		<c-menu-item>电影/电视</c-menu-item>
		<c-menu-item>摄影</c-menu-item>
		<c-menu-item>军武</c-menu-item>
		<c-menu-item>体育</c-menu-item>
		<c-menu-item>天台(股票)</c-menu-item>
	</c-menu>
	<c-menu text="管理">
		<c-menu-item>值班室</c-menu-item>
	</c-menu>
</div>
</template>

<script>
export default {
	name: 'a-sidebar'
}
</script>

<style lang="scss">
@import "~src/variables";

.sidebar {
	background: white;
	box-shadow: 0 0 5px $shadow-color;
}
</style>
