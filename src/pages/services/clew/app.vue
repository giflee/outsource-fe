<template>
	<div id="app">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
			<el-form-item label="线索编码" prop="source_no">
				<!-- <el-input v-model.trim="ruleForm.source_no"></el-input> -->
				<span>{{ruleForm.source_no}}</span>
			</el-form-item>
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
			<!-- <el-form-item label="来源渠道" prop="source_from">
				<el-input v-model.trim="ruleForm.source_from"></el-input>
			</el-form-item> -->
			<el-form-item label="子渠道" prop="source_from_point">
				<el-input v-model.trim="ruleForm.source_from_point"></el-input>
			</el-form-item>
			<el-form-item label="来源活动" prop="source_activity">
				<el-input v-model.trim="ruleForm.source_activity"></el-input>
			</el-form-item>
			<el-form-item label="省份" prop="province">
				<!-- <el-input v-model.trim="ruleForm.province"></el-input> -->
				<el-select v-model="ruleForm.province" placeholder="请选择省份" @visible-change="changeTypeProvince">
					<el-option :label="item" :value="item" v-for="item in provinceArr"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="城市" prop="city">
				<!-- <el-input v-model.trim="ruleForm.city"></el-input>	 -->
				<el-select v-model="ruleForm.city" placeholder="请选择城市">
					<el-option :label="item" :value="item" v-for="item in cityArr[ruleForm.province]"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="意向经销商代码" prop="owner_dealer_code">
				<el-input v-model.trim="ruleForm.owner_dealer_code"></el-input>
			</el-form-item>
			<el-form-item label="意向经销商名称" prop="owner_dealer_name">
				<el-input v-model.trim="ruleForm.owner_dealer_name"></el-input>
			</el-form-item>
			<el-form-item label="线索获取时间" porp="get_date">
				<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.get_date" :editable="disabled">
					
				</el-date-picker>
			</el-form-item>
			<el-form-item label="预计购车时间" porp="predict_buy_date">
				<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.predict_buy_date" :editable="disabled">
					
				</el-date-picker>
			</el-form-item>
			<el-form-item label="预计试驾时间" porp="predict_drive_date">
				<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.predict_drive_date" :editable="disabled">
				
				</el-date-picker>
			</el-form-item>
			<el-form-item label="预计保养时间" porp="predict_repair_date">
				<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.predict_repair_date" :editable="disabled">
					
				</el-date-picker>
			</el-form-item>
			<el-form-item label="意向车型" porp="inten_model">
				<!-- <el-input v-model.trim="ruleForm.inten_model"></el-input> -->
				<el-select v-model="inten_model_arr" multiple collapse-tags placeholder="请选择意向车型">
					<el-option v-for="item in inten_model_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="客户关注颜色" porp="inten_color">
				<el-input v-model.trim="ruleForm.inten_color"></el-input>
			</el-form-item>
			<el-form-item label="备注" prop="remark">
			    <el-input type="textarea" v-model.trim="ruleForm.remark"></el-input>
			</el-form-item>
			<el-form-item label="会员客户编号" porp="member_cust_no">
				<el-input v-model.trim="ruleForm.member_cust_no"></el-input>
			</el-form-item>
			<el-form-item label="推荐人会员ID" porp="recommender_id">
				<el-input v-model.trim="ruleForm.recommender_id"></el-input>
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
	const moment = require('moment')
	const city_model = require('../../../city_model.js')
	export default {
		data() {
			return {
				ruleForm: {
					source_no: '',
					cust_name: '',
					tel: '',
					gender: '',
					source_from: '呼叫中心',
					source_from_point: '',
					source_activity: '',
					province: '',
					city: '',
					owner_dealer_code: '',
					owner_dealer_name: '',
					get_date: '',
					predict_buy_date: '',
					predict_drive_date: '',
					predict_repair_date: '',
					inten_model: '',
					inten_color: '',
					remark: '',
					member_cust_no:'',
					recommender_id:''
				},
				provinceArr: '',
				cityArr: '',
				disabled: false,
				genderMap: {
					man: 0,
					woman: 1
				},
				rules: {
					cust_name: [
						{required: true, message: '客户姓名不能为空', trigger: 'change'}
					],
					tel: [
						{required: true, message: '手机不能为空', trigger: 'change'}
					],
					source_from: [
						{required: true, message: '来源渠道不能为空', trigger: 'change'}
					],
					province: [
						{required: true, message: '省份不能为空', trigger: 'change'}
					],
					city: [
						{required: true, message: '城市不能为空', trigger: 'change'}
					]
				},
				inten_model_options: [
					{"value": "五菱之光","label": "五菱之光"},
					{"value": "五菱荣光","label": "五菱荣光"},
					{"value": "五菱宏光S","label": "五菱宏光S"},
					{"value": "五菱鸿途","label": "五菱鸿途"},
					{"value": "乐驰","label": "乐驰"},
					{"value": "五菱宏光","label": "五菱宏光"},
					{"value": "宝骏630","label": "宝骏630"},
					{"value": "五菱宏光S1","label": "五菱宏光S1"},
					{"value": "宝骏610","label": "宝骏610"},
					{"value": "宝骏730","label": "宝骏730"},
					{"value": "五菱征程","label": "五菱征程"},
					{"value": "五菱荣光V","label": "五菱荣光V"},
					{"value": "宝骏560","label": "宝骏560"},
					{"value": "宝骏330","label": "宝骏330"},
					{"value": "宝骏310","label": "宝骏310"},
					{"value": "五菱之光V","label": "五菱之光V"},
					{"value": "宝骏E100","label": "宝骏E100"},
					{"value": "宝骏510","label": "宝骏510"},
					{"value": "宝骏310W","label": "宝骏310W"},
					{"value": "五菱宏光S3","label": "五菱宏光S3"},
					{"value": "宝骏530","label": "宝骏530"},
					{"value": "宝骏360","label": "宝骏360"}
				],
				inten_model_arr: []
			}
		},
		created: function() {
			this.$data.provinceArr = city_model.provinceArr;
			this.$data.cityArr = city_model.cityArr;
			this.init();
			this.getInitInfo();
		},
		filters:{
		  	formatDate: function(value) {
		  		if (!value)  return '';
		  		return moment(value,"YYYYMMDDHHmmss").format('YYYY-MM-DD HH:mm:ss');
		  	}
		},
		methods: {
			save() {
				var _$$this = this;
				var filter = {
					get_date: '',
					predict_buy_date: '',
					predict_drive_date: '',
					predict_repair_date: '',
				}

				// format param
				this.formatParam();
				_.merge(filter, _$$this.$data.ruleForm, true);
				_.forIn(filter, function(value, key){
					if (value && (key == 'get_date' || key == 'predict_buy_date' || key == 'predict_drive_date' || key == 'predict_repair_date')) {
						filter[key] = moment(new Date(value).getTime()).format('YYYYMMDDHHmmss');
					}
				})

				_$$this.$refs['ruleForm'].validate((valid) => {
					if (valid) {
						_$$this.$http.post('/wl2/api/lead/add',filter).then((_ret) => {
							console.log(_ret);
							if (_ret.body.code != 200) {
								this.$message({
									showClose: true,
									message: _ret.body.message,
									type: 'error'
								})
							}else{
								_$$this.$data.ruleForm.source_no = _ret.body.result;
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
			init() {
				/**
				* 手机号的参数名字必须传tel
				*/
				var urlObj = util.parseQueryString(location.search);
				_.merge(this.$data.ruleForm, urlObj, true);
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
				var filter =  {
					tel: _$$this.$data.ruleForm.tel || ''
				}
				_$$this.$http.post('/wl2/api/lead/query', filter).then((_ret) => {
					if (_ret.body.code != 200) {
						_$$this.$message({
							showClose: true,
							message: _ret.body.message,
							type: 'error'
						})
					}else{
						// 有数据的时候是一种处理方式
						if (_ret.body.result.source_no) {
							_.merge(_$$this.$data.ruleForm, _ret.body.result);

						// 预处理时间字段
						if (_$$this.$data.ruleForm.predict_buy_date) {
						_$$this.$data.ruleForm.predict_buy_date = moment(_$$this.$data.ruleForm.predict_buy_date,"YYYYMMDDHHmmss").format('YYYY-MM-DD');
						}

						if (_$$this.$data.ruleForm.predict_drive_date) {
						_$$this.$data.ruleForm.predict_drive_date = moment(_$$this.$data.ruleForm.predict_drive_date,"YYYYMMDDHHmmss").format('YYYY-MM-DD');
						}

						if (_$$this.$data.ruleForm.predict_repair_date) {
						_$$this.$data.ruleForm.predict_repair_date = moment(_$$this.$data.ruleForm.predict_repair_date,"YYYYMMDDHHmmss").format('YYYY-MM-DD');
						}

						if (_$$this.$data.ruleForm.get_date) {
						_$$this.$data.ruleForm.get_date = moment(_$$this.$data.ruleForm.get_date,"YYYYMMDDHHmmss").format('YYYY-MM-DD');
						}

						// 意向车型格式化
						if (_$$this.$data.ruleForm.inten_model) {
							// 有逗号，可能是新版本多选的形式
							_$$this.$data.inten_model_arr = _$$this.$data.ruleForm.inten_model.split(',');
						}


						}else{
							// 无数据时候的处理方式
							this.$data.ruleForm.newest = 1;
						}
					}
				})
			},
			formatParam(){
				if (this.$data.inten_model_arr && this.$data.inten_model_arr.length) {
					this.$data.ruleForm.inten_model = this.$data.inten_model_arr.join(',');
				}
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
	.el-select{
		width: 100%;
	}
</style>