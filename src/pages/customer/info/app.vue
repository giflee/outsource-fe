<template>
	<div id="app">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="客户姓名" prop="name">
				<el-input v-model.trim="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="手机" prop="phone">
				<el-input v-model.trim="ruleForm.phone"></el-input>
			</el-form-item>
			<el-form-item label="省份" prop="province">
				<el-input v-model.trim="ruleForm.province"></el-input>
			</el-form-item>
			<el-form-item label="城市" prop="city">
				<el-input v-model.trim="ruleForm.city"></el-input>
			</el-form-item>
			<el-form-item label="反馈结果" prop="callback">
			    <el-select v-model="ruleForm.callback" placeholder="请选择反馈结果" @change="selectChange">
			      <el-option label="无法选择" value="0"></el-option>
			      <el-option label="确定结果" value="1"></el-option>
			    </el-select>
			</el-form-item>
			<el-form-item label="意向经销商代码" prop="code">
				<el-input v-model.trim="ruleForm.code"></el-input>
			</el-form-item>
			<el-form-item label="意向经销商名称" prop="agencyName">
				<el-input v-model.trim="ruleForm.agencyName"></el-input>
			</el-form-item>
			<el-form-item label="备注" prop="remark">
			    <el-input type="textarea" v-model.trim="ruleForm.remark"></el-input>
			</el-form-item>
		</el-form>
		<el-row class="m-fix-btn">
			<el-col :span="6" :offset="9">
				<el-button type="primary" @click="save" class="u-maxwidth-btn">保存</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	const util = require('../../../util.js')
	export default {
		data() {
			var checkCode = (rule, value, callback) => {
				if (!this.$data.ruleForm.code && !this.$data.ruleForm.agencyName) {
					callback(new Error('意向经销商代码或名称不能为空'));
				}
			}
			return {
				ruleForm: {
					name: '',
					phone: '',
					province: '',
					city: '',
					callback: '0',
					code: '',
					agencyName: '',
					remark: ''
				},
				rules: {
						
					}
			}
		},
		created: function() {
			this.init();
		},
		methods: {
			init() {
				/**
				* 手机号的参数名字必须传tel
				*/
				var urlObj = util.parseQueryString(location.search);
				urlObj.phone = urlObj.tel;
				_.merge(this.$data.ruleForm, urlObj, true);
			},
			save() {
				var _$$this = this;
				_$$this.$refs['ruleForm'].validate((valid) => {
					if (valid) {
						_$$this.$http.post('/api/customer/update',_$$this.$data.ruleForm).then((_ret) => {
							console.log(_ret);
							if (_ret.body.code != 200) {
								this.$message({
									showClose: true,
									message: _ret.body.message,
									type: 'error'
								})
							}else{
								this.$message({
									showClose: true,
									message: '保存成功',
									type: 'success'
								})
							}
						}).catch((_err) => {
							console.log(_err);
							this.$message({
								showClose: true,
								message: _err.body.message,
								type: 'error'
							})
						})
					}else{
						return false;
					}
				})
			},
			selectChange() {
				if (this.$data.ruleForm.callback == 1) {
						var checkCode = (rule, value, callback) => {
							if (!this.$data.ruleForm.code && !this.$data.ruleForm.agencyName) {
								callback(new Error('意向经销商代码或名称不能为空'));
							}else{
								callback();
							}
						}
					this.$data.rules = {
										code: [
												{ validator: checkCode, trigger: 'blur'}
											],
										agencyName: [
											{ validator: checkCode, trigger: 'blur'}
										]
									}
		
				}else{
					this.$data.rules = {};
				}
			}
		}
	}
</script>

<style lang="postcss">
	.u-maxwidth-btn{
		width: 100%;
	}
</style>