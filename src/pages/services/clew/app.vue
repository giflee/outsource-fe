<template>
	<div id="app">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
			<el-form-item label="线索编码" prop="source_no">
				<el-input v-model="ruleForm.source_no"></el-input>
			</el-form-item>
			<el-form-item label="客户姓名" prop="cust_name">
				<el-input v-model="ruleForm.cust_name"></el-input>
			</el-form-item>
			<el-form-item label="手机" prop="tel">
				<el-input v-model="ruleForm.tel"></el-input>
			</el-form-item>
			<el-form-item label="性别" prop="gender">
				<el-select v-model="ruleForm.gender" placeholder="请选择性别">
					<el-option label="男" value="0"></el-option>
					<el-option label="女" value="1"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="来源渠道" prop="source_from">
				<el-input v-model="ruleForm.source_from"></el-input>
			</el-form-item>
			<el-form-item label="子渠道" prop="source_from_point">
				<el-input v-model="ruleForm.source_from_point"></el-input>
			</el-form-item>
			<el-form-item label="来源活动" prop="source_activity">
				<el-input v-model="ruleForm.source_activity"></el-input>
			</el-form-item>
			<el-form-item label="省份" prop="province">
				<el-input v-model="ruleForm.province"></el-input>
			</el-form-item>
			<el-form-item label="城市" prop="city">
				<el-input v-model="ruleForm.city"></el-input>	
			</el-form-item>
			<el-form-item label="意向经销商代码" prop="owner_dealer_code">
				<el-input v-model="ruleForm.owner_dealer_code"></el-input>
			</el-form-item>
			<el-form-item label="意向经销商名称" prop="owner_dealer_name">
				<el-input v-model="ruleForm.owner_dealer_name"></el-input>
			</el-form-item>
			<el-form-item label="线索获取时间" porp="get_date">
				<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.get_date">
					
				</el-date-picker>
			</el-form-item>
			<el-form-item label="预计购车时间" porp="predict_buy_date">
				<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.predict_buy_date">
					
				</el-date-picker>
			</el-form-item>
			<el-form-item label="预计试驾时间" porp="predict_drive_date">
				<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.predict_drive_date">
					
				</el-date-picker>
			</el-form-item>
			<el-form-item label="预计保养时间" porp="predict_repair_date">
				<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.predict_repair_date">
					
				</el-date-picker>
			</el-form-item>
			<el-form-item label="意向车型" porp="inten_model">
				<el-input v-model="ruleForm.inten_model"></el-input>
			</el-form-item>
			<el-form-item label="备注" prop="remark">
			    <el-input type="textarea" v-model="ruleForm.remark"></el-input>
			</el-form-item>
			<el-form-item label="会员客户编号" porp="member_cust_no">
				<el-input v-model="ruleForm.member_cust_no"></el-input>
			</el-form-item>
			<el-form-item label="推荐人会员ID" porp="recommender_id">
				<el-input v-model="ruleForm.recommender_id"></el-input>
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
			return {
				ruleForm: {
					source_no: '',
					cust_name: '',
					tel: '',
					gender: '',
					source_from: '',
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
					remark: '',
					member_cust_no:'',
					recommender_id:''
				},
				rules: {
					cust_name: [
						{required: true, message: '客户姓名不能为空', trigger: 'blur'}
					],
					tel: [
						{required: true, message: '手机不能为空', trigger:'blur'}
					],
					source_from: [
						{required: true, message: '来源渠道不能为空', trigger: 'blur'}
					]
				}
			}
		},
		created: function() {
			this.init();
		},
		methods: {
			save() {
				var _$$this = this;
				_$$this.$refs['ruleForm'].validate((valid) => {
					if (valid) {
						_$$this.$http.post('/api/lead/add',_$$this.$data.ruleForm).then((_ret) => {
							console.log(_ret);
						}).catch((_err) => {
							console.log(_err);
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