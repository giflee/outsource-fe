<template>
	<div id="app">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
			<el-form-item label="客户姓名" prop="cust_name">
				<el-input v-model.trim="ruleForm.cust_name" @blur="save()"></el-input>
			</el-form-item>
			<el-form-item label="客户热度" prop="cust_hot">
				<span>{{ruleForm.cust_hot}}</span>
			</el-form-item>
			<el-form-item label="厂家线索渠道" prop="source_from">
				<span>{{ruleForm.source_form}}</span>
			</el-form-item>
			<el-form-item label="意向经销商编号" prop="dealer_code">
				<span>{{ruleForm.dealer_code}}</span>
			</el-form-item>
			<el-form-item label="意向经销商名称" prop="dealer_name"> 
				<span>{{ruleForm.dealer_name}}</span>
			</el-form-item>
			<el-form-item label="意向车型" prop="inten_model">
				<el-input v-model.trim="ruleForm.inten_model" @blur="save()"></el-input>
			</el-form-item>
			<el-form-item label="其他意向车型" prop="inten_model_remark">
				<span>{{ruleForm.inten_model_remark}}</span>
			</el-form-item>
			<el-form-item label="手机" prop="tel">
				<span>{{ruleForm.tel}}</span>
			</el-form-item>
			<el-form-item label="性别" prop="gender">
				<el-select v-model="ruleForm.gender" placeholder="请选择性别" @visible-change="save()">
					<el-option label="请选择" value=""></el-option>
					<el-option label="男" value="0"></el-option>
					<el-option label="女" value="1"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="来源活动" prop="source_activity">
				<span>{{ruleForm.source_activity}}</span>
			</el-form-item>
			<el-form-item label="线索获取时间" prop="get_date">
				<span>{{ruleForm.get_date}}</span>
			</el-form-item>
			<el-form-item label="预约购车时间" prop="predict_buy_date">
				<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.predict_buy_date" :editable="disabled">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="省份" prop="province">
				<el-input v-model.trim="ruleForm.province" @blur="save()"></el-input>
			</el-form-item>
			<el-form-item label="城市" prop="city">
				<el-input v-model.trim="ruleForm.city" @blur="save()"></el-input>	
			</el-form-item>
			<el-form-item label="备注" prop="remark">
			    <el-input type="textarea" v-model.trim="ruleForm.remark" @blur="save()"></el-input>
			</el-form-item>
			<el-form-item label="备注1" prop="remark_one">
			    <el-input type="textarea" v-model.trim="ruleForm.remark_one" @blur="save()"></el-input>
			</el-form-item>
			<el-form-item label="备注2" prop="remark_two">
			    <el-input type="textarea" v-model.trim="ruleForm.remark_two" @blur="save()"></el-input>
			</el-form-item>
		</el-form>
		<!-- <el-row class="m-fix-btn">
			<el-col :span="6" :offset="9">
				<el-button type="primary" @click="save" class="u-maxwidth-btn">提交</el-button>
			</el-col>
		</el-row> -->
	</div>
</template>

<script>
	const util = require('../../../util.js')
	const moment = require('moment')
	export default {
		data() {
			return {
				ruleForm: {
					cust_name: '',
					cust_hot: '',
					source_from: '',
					dealer_code: '',
					dealer_name: '',
					inten_model: '',
					inten_model_remark: '',
					tel: '',
					gender: '',
					source_activity: '',
					get_date: '',
					predict_buy_date: '',
					province: '',
					city: '',
					remark: '',
					remark_one: '',
					remark_two: ''
				},
			disabled: false,
			rules: {
				cust_name: [
					{required: true, message: '客户姓名不能为空', trigger: 'change'}
				],
				cust_hot: [
					{required: true, message: '客户热度不能为空', trigger: 'change'}
				],
				source_from: [
					{required: true, message: '线索渠道不能为空', trigger: 'change'}
				],
				dealer_name: [
					{required: true, message: '经销商名称不能为空', trigger: 'change'}
				]
			}
		}
		},
		created: function() {
			this.init();
			this.getInitInfo();
		},
		methods: {
			init() {
				var urlObj = util.parseQueryString(location.search);
				this.$data.ruleForm.tel = urlObj.tel;
			},
			getInitInfo() {
				var _$$this = this;
				var filter = {
					tel: _$$this.$data.ruleForm.tel || '13029339077'
				}
				_$$this.$http.post('/wl2/api/callout/query',filter).then((_ret) => {
					if (_ret.body.code != 200) {
						_$$this.$message({
							showClose: true,
							message: _ret.body.message,
							type: 'error'
						})
					}else{
						_.merge(_$$this.$data.ruleForm, _ret.body.result)
					}
				}).catch((_err) => {
					console.log(_err);
					_$$this.$message({
						showClose: true,
						message: _err.body.message,
						type: 'error'
					})
				})	
			},
			save() {
				var _$$this = this;
				var filter = {
					predict_buy_date: ''
				}
				_.merge(filter, _$$this.$data.ruleForm, true);
				_.forIn(filter, function(value, key){
					if (value && (key == 'predict_buy_date')) {
						filter[key] = moment(new Date(value).getTime()).format('YYYYMMDDHHmmss');
					}
				})

				_$$this.$http.post('/wl2/api/callout/update', filter).then((_ret) => {
						if (_ret.body.code != 200) {
							_$$this.$message({
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
					_$$this.$message({
						showClose: true,
						message: _err.body.message,
						type: 'error'
					})
				})
			}
		}
	}
</script>

<style lang="postcss">
	.m-fix-btn{
		position: fixed;
		left: 0px;
		bottom: 0px;
		width: 100%;
		height: 56px;
		background: #eee;
		padding-bottom: 10px;
		padding-top: 10px;
	}
	#app{
		padding-bottom: 56px;
	}
	.u-maxwidth-btn{
		width: 100%;
	}
</style>

























