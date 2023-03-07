<template>
	<view>
		<my-login v-if="!token"></my-login>
		<my-info v-else></my-info>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import { mapState } from "vuex"
	export default {
		mixins: [badgeMix],
		data() {
			return {
				
			};
		},
		computed: {
			...mapState('m_user',['token'])
		},
		
	}
</script>

<style lang="scss">

</style>
