<template>
	<div id="app">
		<div class="m-search">
			<el-input placeholder="请输入搜索内容" icon="search" v-model="keyword"></el-input>
			<el-row :gutter="20" type="flex">
				<el-col :span="12">
					<el-button type="primary" icon="search">搜索经销商</el-button>
				</el-col>
				<el-col :span="12">
					<el-button type="primary" icon="search">搜索服务商</el-button>
				</el-col>
			</el-row>
		</div>
		<div class="m-result">
			<el-form label-position="left" label-width="150px">
				<el-form-item label="业务大区">
					<span>华南区域</span>
				</el-form-item>
				<el-form-item label="服务商代码">
					<span>HN6789</span>
				</el-form-item>
				<el-form-item label="服务商名称">
					<span>骏宝行</span>
				</el-form-item>
				<el-form-item label="服务站号">
					<span>123465</span>
				</el-form-item>
				<el-form-item label="分厂">
					<span>杭州分厂</span>
				</el-form-item>
				<el-form-item label="联系人">
					<span>王明静</span>
				</el-form-item>
				<el-form-item label="联系电话">
					<span>13333333333</span>
				</el-form-item>
				<el-form-item label="经营地址">
					<span>杭州滨江区五菱店</span>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				keyword: ''
			}
		}
	}
</script>

<style lang="postcss">
	
</style>