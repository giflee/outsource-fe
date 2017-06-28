<template>
	<div id="app" class="g-main">
		<el-row :gutter="20">
			<el-col :span="24">
				<el-input v-model="input" placeholder="请输入工单号码"></el-input>
			</el-col>
		</el-row>
		<br>
		<br>
		<el-row :gutter="20">
			<el-col :span="24">
				<el-button type="primary" @click="worksheetQuery" class="m-bind-btn">工单查询</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				input: '34663223',
			}
		},
		methods: {
			worksheetQuery() {
				
			}
		}
	}
</script> 

<style lang="sass">
.g-main {
	margin: 0 auto;
	display: table-cell;
	vertical-align: middle; 
    position: absolute;
    left: 15%;
    top: 25%;
}
.m-bind-btn {
	width: 265px;
	height: 36px;
}		
</style>