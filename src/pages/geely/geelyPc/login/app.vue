<template>
	<div id="app" class="g-main">
		<el-row>
		<el-tabs v-model="activeName" @tab-click="selectTab">
			<el-tab-pane label="工单查询" name="first">
				哈哈哈哈哈哈哈哈
			</el-tab-pane>
			<el-tab-pane label="手机号查询" name="second">
				嘿嘿嘿额嘿嘿嘿嘿呵呵
			</el-tab-pane>
		</el-tabs>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: "first"
			};
		},
		methods: {
			selectTab(tab, event){
				var _$$this = this;
				console.log(tab, event);
			}
		}
	}

</script>