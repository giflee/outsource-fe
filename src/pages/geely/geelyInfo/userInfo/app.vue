<template>
	<div id="app"  class="g-main">
		<el-form ref="form"  label-width="80px">
			<el-form-item label="姓名">
				<span> {{ userData.fullName }}</span>	
    			<!-- <el-input v-model="userData.fullName"></el-input> -->
  			</el-form-item>
			<el-form-item label="性别">
			    <el-select v-model="userData.genderCode" placeholder="请选择性别">
			      	<!-- <el-option v-for="item in genders" :label="item.label" :value="item.value"></el-option> -->
			    </el-select>
			</el-form-item>
			<el-form-item label="手机号码1">
    			<el-input v-model="userData.mobilePhone"></el-input>
  			</el-form-item>
  			<el-form-item label="手机号码2">
    			<el-input v-model="userData.telephone2"></el-input>
  			</el-form-item>
			<el-form-item v-if="telState" label="手机号码3">
    			<el-input v-model="userData.telephone3"></el-input>
  			</el-form-item>
  			<el-form-item v-else label="">
    			<a @click="add" class="u-add-telephone">+添加手机号码</a>
  			</el-form-item>
			<el-form-item label="邮箱">
				<span>666666 {{ userData.emailAddress1 }}</span>
    			<!-- <el-input v-model="userData.emailAddress1"></el-input> -->
  			</el-form-item>
			<el-form-item label="省份">
    			<el-input v-model="userData.province"></el-input>
  			</el-form-item>
  			<el-form-item label="城市">
    			<el-input v-model="userData.city"></el-input>
  			</el-form-item>
  			<el-form-item label="区域">
    			<el-input v-model="userData.district"></el-input>
  			</el-form-item>
			<el-form-item label="联络地址">
				<template>
					<span>{{ userData.address }}</span>
				</template>
    			<!-- <el-input type="textarea" v-model="userData.address"></el-input> -->
  			</el-form-item>
  			<el-form-item label="证件号码">
    			<span>{{ userData.governmentId }}</span>
  			</el-form-item>
  			<el-form-item label="接入渠道">
    			<span> {{ userData.leadSourceCode }}</span>
  			</el-form-item>
  			<el-form-item label="数据来源">
  				<span> {{ userData.dataFrom }}</span>
  			</el-form-item>
  			<el-form-item label="备注">
    			<el-input type="textarea" v-model="userData.description"></el-input>
  			</el-form-item>
  			<!-- <el-form-item>
			    <el-button type="primary" @click="onSubmit">提交</el-button>
		  	</el-form-item> -->
		</el-form>
	</div>

</template>


<script>
const util = require('../../../../util.js')
const moment = require('moment')
export default {
	data() {
		return {
			userData: {

			},
			telState: false,
		}
	},
	created: function() {
		// this.init();
		this.getUserInfo();	
	},
	methods: {
		// init() {
		// 		var urlObj = util.parseQueryString(location.search);
		// },
		getUserInfo() {
			var _$$this = this;
			var filter = {
				phone: '13898701001'
			};
			_$$this.$http.get('/gl2/api/contact/query', {
				emulateJson: true,
				params: filter
			}).then((_ret) => {
				if(_ret.body.code == 200){
					_$$this.$data.userData.fullName = _ret.body.result.fullName;
					_.merge(_$$this.$data.userData,_ret.body.result, true);
					// if(_ret.body.result.telephone3 == ''){
					// 	_$$this.$data.telState = false;
					// }else{
					// 	_$$this.$data.telState = true;
					// }
					this.$forceUpdate();
				}else{
					_$$this.$message.error(_ret.body.message);
				}
			}).catch((_ret) => {
				_$$this.$message.error('服务器出错了');
			})
		},

		add() {
			this.$data.telState = true;
		},

		// onSubmit() {

		// }
	},
	filters: {
		gender: function(value) {
			var map = {
				1: '先生',
				2: '女士'
			}
			return map[value];
		},
		channel: function(value) {
			var map = {
				1: '电话',
				2: '邮件',
				3: '官网',
				4: '在线',
				5: '微博',
				6: '微信',
				7: '短信',
				8: '电商',
				9: '经销商',
				10: '线上活动',
				11: '线下活动',
				12: '第三方合作',
				13: '其他'
			}
			return map[value];
		},
		source: function(value) {
			var map = {
				1: '官网',
				2: 'APP',
				3: '整车销售接口',
				4: '呼叫中心',
				5: '销售客户同步接口',
				6: '微信',
				7: '售后客户同步接口'
			}
			return map[value];
		}
	}
}
</script>

<style>
</style>