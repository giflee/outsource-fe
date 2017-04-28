<template>
	<div id="app">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="客户姓名" prop="name">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="手机" prop="phone">
				<el-input v-model="ruleForm.phone"></el-input>
			</el-form-item>
			<el-form-item label="省份" prop="province">
				<el-input v-model="ruleForm.province"></el-input>
			</el-form-item>
			<el-form-item label="城市" prop="city">
				<el-input v-model="ruleForm.city"></el-input>
			</el-form-item>
			<el-form-item label="反馈结果" prop="callback">
			    <el-select v-model="ruleForm.callback" placeholder="请选择反馈结果">
			      <el-option label="请选择反馈结果" value="0"></el-option>
			      <el-option label="无法选择" value="1"></el-option>
			      <el-option label="确定结果" value="2"></el-option>
			    </el-select>
			</el-form-item>
			<el-form-item label="意向经销商代码" prop="code">
				<el-input v-model="ruleForm.code"></el-input>
			</el-form-item>
			<el-form-item label="意向经销商名称" prop="agencyName">
				<el-input v-model="ruleForm.agencyName"></el-input>
			</el-form-item>
			<el-form-item label="备注" prop="remark">
			    <el-input type="textarea" v-model="ruleForm.remark"></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				ruleForm: {
					name: '',
					phone: '',
					province: '',
					city: '',
					callback: '',
					code: '',
					agencyName: '',
					remark: ''
				},
				rules: {
					code: [
						{required: true, message: '意向经销商代码或名称不能为空', trigger: 'blur'}
					],
					agencyName: [
						{required: true, message: '意向经销商代码或名称不能为空', trigger: 'blur'}
					]
				}
			}
		},
		created: function() {
			this.init();
		},
		methods: {
			init() {
				var _$$this = this;
				_$$this.$http.get('/api/customer/info').then((_ret) => {
					console.log(_ret);
				}).catch((_err) => {
					console.log(_err);
				})
			}
		}
	}
</script>

<style lang="postcss">
	
</style>