<template>
	<div id="app" class="g-main">
		<div class="m-name">
			<h2>吉利工单查询系统</h2>
		</div>
		<div class="m-query">
			<el-row>
			<el-tabs v-model="activeName" @tab-click="selectTab" type="border-card">
				<el-tab-pane label="工单查询" name="first">
					<el-form>
						<el-form-item label="工单编号">
							<el-input v-model="worksheetno" @input.native="checkWorksheetno" placeholder="请输入工单号码" 
							:maxlength="13"></el-input>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="手机号查询" name="second">
					嘿嘿嘿额嘿嘿嘿嘿呵呵
				</el-tab-pane>
			</el-tabs>
			</el-row>
		</div>
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

<style>
		
</style>