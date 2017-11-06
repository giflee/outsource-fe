<template>
	<div id="app">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
			<el-form-item label="客户姓名" prop="cust_name">
				<el-input v-model.trim="ruleForm.cust_name"></el-input>
			</el-form-item>
			<el-form-item label="手机" prop="tel">
				<el-input v-model.trim="ruleForm.tel"></el-input>
			</el-form-item>
			<el-form-item label="性别" prop="gender">
				<el-select v-model="ruleForm.gender" placeholder="请选择性别">
					<el-option label="请选择" value=""></el-option>
					<el-option label="男" :value="genderMap.man"></el-option>
					<el-option label="女" :value="genderMap.woman"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="省份" prop="province">
				<!-- <el-input v-model.trim="ruleForm.province"></el-input> -->
				<el-select v-model="ruleForm.province" placeholder="请选择省份" @visible-change="changeTypeProvince">
					<el-option :label="item" :value="item" v-for="item in provinceArr"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="城市" prop="city">
				<!-- <el-input v-model.trim="ruleForm.city"></el-input> -->
				<el-select v-model="ruleForm.city" placeholder="请选择城市">
					<el-option :label="item" :value="item" v-for="item in cityArr[ruleForm.province]"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="反馈结果" prop="call_result">
			    <el-select v-model="ruleForm.call_result" placeholder="请选择反馈结果" @change="selectChange">
			      <el-option label="无法选择" :value="callbackMap.noresult"></el-option>
			      <el-option label="确定结果" :value="callbackMap.hasresult"></el-option>
			    </el-select>
			</el-form-item>
			<el-form-item label="意向经销商代码" prop="owner_dealer_code">
				<el-input v-model.trim="ruleForm.owner_dealer_code"></el-input>
			</el-form-item>
			<el-form-item label="备注" prop="remark">
			    <el-input type="textarea" v-model.trim="ruleForm.remark"></el-input>
			</el-form-item>
		</el-form>
		<el-row class="m-fix-btn">
			<el-col :span="6" :offset="9">
				<el-button type="primary" @click="save" class="u-maxwidth-btn">提交</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	const util = require('../../../util.js')
	const city_model = require('../../../city_model.js')
	export default {
		data() {
			var checkCode = (rule, value, callback) => {
				if (!this.$data.ruleForm.owner_dealer_code) {
					callback(new Error('意向经销商代码或名称不能为空'));
				}
			}
			return {
				ruleForm: {
					cust_name: '',
					tel: '',
					province: '',
					city: '',
					call_result: '',
					owner_dealer_code: '',
					remark: '',
					gender: ''
				},
				genderMap: {
					man: 0,
					woman: 1
				},
				callbackMap: {
					noresult: 0,
					hasresult: 1
				},
				isFirst: false,
				rules: {
						cust_name: [
							{required: true, message: '客户姓名不能为空', trigger: 'change'}
						],
						tel: [
							{required: true, message: '手机不能为空', trigger: 'change'}
						]
					},
				provinceArr: '',
				cityArr: ''
			}
		},
		created: function() {
			this.$data.provinceArr = city_model.provinceArr;
			this.$data.cityArr = city_model.cityArr;
			this.init();
			this.getInitInfo();
		},
		methods: {
			init() {
				/**
				* 手机号的参数名字必须传tel
				*/
				var urlObj = util.parseQueryString(location.search);
				_.merge(this.$data.ruleForm, urlObj, true);
			},
			save() {
				var _$$this = this;
				_$$this.$refs['ruleForm'].validate((valid) => {
					if (valid) {
						_$$this.$http.post('/wl2/api/customer/update',_$$this.$data.ruleForm).then((_ret) => {
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
									message: '提交成功',
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
				if (this.$data.isFirst) {
					this.$data.isFirst = false;
					return;
				}
				// sb 五菱自己把自己的需求否了
				// if (this.$data.ruleForm.call_result == 1) {
				// 		var checkCode = (rule, value, callback) => {
				// 			if (!this.$data.ruleForm.owner_dealer_code) {
				// 				callback(new Error('意向经销商代码或名称不能为空'));
				// 			}else{
				// 				callback();
				// 			}
				// 		}
			
				// 	var prorules = {
				// 						owner_dealer_code: [
				// 								{ validator: checkCode, trigger: 'blur'}
				// 							]
				// 					}
				// 	_.merge(this.$data.rules, prorules);
		
				// }else{
				// 	var prorules = {
				// 					cust_name: [
				// 						{required: true, message: '客户姓名不能为空', trigger: 'change'}
				// 					],
				// 					tel: [
				// 						{required: true, message: '手机不能为空', trigger: 'change'}
				// 					],
				// 					province: [
				// 						{required: true, message: '省份不能为空', trigger: 'change'}
				// 					],
				// 					city: [
				// 						{required: true, message: '城市不能为空', trigger: 'change'}
				// 					]
				// 				}
				// 	this.$data.rules = prorules;
				// }
			},
			changeTypeProvince(_flag) {
				if (!_flag) {
					if (this.$data.ruleForm.province) {
						var province = this.$data.ruleForm.province;
						this.$data.ruleForm.city = this.$data.cityArr[province][0];
					}
				}
			},
			getInitInfo() {
				var _$$this = this;
				var filter = {
					tel: _$$this.$data.ruleForm.tel || ''
				}
				_$$this.$http.post('/wl2/api/customer/query',filter).then((_ret) => {
					if (_ret.body.code != 200) {
						_$$this.$message({
							showClose: true,
							message: _ret.body.message,
							type: 'error'
						})
					}else{
						// 第一次加载标志位
						_$$this.$data.isFirst = true;
						// 合数据
						_.merge(_$$this.$data.ruleForm, _ret.body.result);
						_$$this.init();
					}
				})

			}
		}
	}
</script>

<style lang="sass">
	.u-maxwidth-btn{
		width: 100%;
	}
	#app{
		padding-top: 15px;
	}
</style>