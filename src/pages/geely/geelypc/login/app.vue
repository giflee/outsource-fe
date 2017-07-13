<template>
	<div id="app" class="g-main">
		<div class="m-name">
			<img src="../../../../assets/img/吉利logo.png">
			<div class="f-name">
				<span>吉利工单查询系统</span>
			</div>
		</div>
		<div class="m-query">
			<el-row>
			<el-tabs v-model="activeName" @tab-click="selectTab" type="border-card">
				<el-tab-pane label="工单查询" name="first">
					<el-row :gutter="20">
						<el-col :span="24">
							<el-input v-model="worksheetno" @input.native="checkWorksheetno" placeholder="请输入工单号码" 
							:maxlength="13"></el-input>
						</el-col>
					</el-row>
					<el-row v-if="worksheetnoCheck">
						<span class="tips">输入工单号有误</span>
					</el-row>
					<el-button type="primary" @click="worksheetQuery" class="m-btn">工单查询</el-button>
				</el-tab-pane>
				<el-tab-pane label="手机号查询" name="second">
					<el-row :gutter="20">
						<el-col :span="24">
							<el-input placeholder="请输入手机号码" v-model="mobile" @input.native="checkMobile" :maxlength="11"></el-input>
						</el-col>
					</el-row>
					<el-row v-if="phoneCheckResult">
						<span class="tips">输入手机号码有误</span>
					</el-row>
					<el-row v-if="getCodeError">
						<span class="tips">验证码获取失败，请稍后再试</span>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="16">
							<el-input v-model="code" placeholder="短信验证码" @input.native="checkCode" :maxlength="6"></el-input>
						</el-col>
						<el-col :span="8">
							<el-button type="primary" id="btnSendCode" @click="getCode" :disabled="canCode">{{codeBtnText}}</el-button>
						</el-col>
					</el-row>
					<el-row v-if="codeCheckResult">
						<span class="tips">输入验证码有误</span>
					</el-row>
					<el-button type="primary" @click="mobileQuery" class="m-btn">手机号查询</el-button>
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
				activeName: "first",
				worksheetno: '',
				mobile: '',
				code: '',
				worksheetnoCheck: false,
				phoneCheckResult: false,
				codeCheckResult: false,
				codeBtnText: '验证码',
				canCode: false,
				codeCheckLength: false,
				getCodeError: false
			};
		},
		methods: {
			init() {
				var urlObj = util.parseQueryString(location.search);
			},
			selectTab(tab, event){
				var _$$this = this;
			},
			checkWorksheetno() {
				this.$data.worksheetnoCheck = false;
				if(isNaN(this.$data.worksheetno)){
					this.$data.worksheetnoCheck = true;
				}
			},
			worksheetQuery() {
				var _$$this = this;
				var id = _$$this.$data.worksheetno
				var filter = {
					id: _$$this.$data.worksheetno,
				};
				if(_$$this.$data.worksheetno==0 || isNaN(this.$data.worksheetno)){
					_$$this.$data.worksheetnoCheck = true;
				}else{
					_$$this.$http.get('/geely/api/ticket/get/',{
						emulateJSON: true,
						params: filter
					}).then((_ret) => {
						console.log(_ret);
						if(_ret.body.code == 200){
							location.href = '../geelypc/details.html?id=' + id
						}else if(_ret.body.code == 903){
							_$$this.$data.worksheetnoCheck = true;
						}
					}).catch((_err) => {
						console.log(_err);
					})
				}	
			},
			// 手机号验证
			checkMobile() {
				this.$data.phoneCheckResult = false;
				var partten1 = /^1$/;
				var partten2 = /^1[3|4|5|7|8]$/;
				var partten3 = /^1[3|4|5|7|8]\d*\d$/;
				if(this.$data.mobile != ""){
					if (partten1.test(this.$data.mobile) || partten2.test(this.$data.mobile) || partten3.test(this.$data.mobile)){
					this.$data.phoneCheckResult = false;
					}else{
						this.$data.phoneCheckResult = true;
					}
				}
			},
			getCode() {
				var _$$this = this;
				var filter = {
					phone: _$$this.$data.mobile,
				}
				if(_$$this.$data.mobile == 0 || (_$$this.$data.mobile.toString()).length < 11){
					_$$this.$data.phoneCheckResult = true;
				}else if(!_$$this.$data.phoneCheckResult){
					_$$this.$http.get('/geely/api/getCode/', {
						emulateJSON: true,
						params: filter
					}).then((_ret) =>{
						console.log(_ret);
						if(!_ret.body.result){
							_$$this.$data.getCodeError = true;
							_$$this.$message.error(_ret.body.message);
						}
						else{
							this.codeSucc();
							_$$this.$data.getCodeError = false;
						}
					}).catch((_err) => {

						_$$this.$message.error('服务器出错了');
					})
				}
				
			},
			// 验证码验证
			checkCode() {
				this.$data.codeCheckResult = false
				this.$data.code = (isNaN(parseInt(this.$data.code)))?'' : this.$data.code;
				if (isNaN(this.$data.code)){
					this.$data.codeCheckResult = true;
				}
			},
			//手机号查询
			mobileQuery() {
				var _$$this = this;
				var filter = {
					phone: _$$this.$data.mobile,
					code: _$$this.$data.code
				};
				if(_$$this.$data.mobile == 0 || (_$$this.$data.mobile.toString()).length < 11){
					_$$this.$data.phoneCheckResult = true;
					// 如果手机号提示错误就不检验验证码错误了，不发接口
				}else if(!_$$this.$data.phoneCheckResult){
					if(_$$this.$data.code == 0){
						_$$this.$data.codeCheckResult = true;
					}else if((_$$this.$data.code.toString()).length < 6) {
						_$$this.$data.codeCheckResult = true;
					}else {
						_$$this.$http.get('/geely/api/codeCheck/',{
						emulateJSON: true,
						params: filter
						}).then((_ret) =>{
							console.log(_ret);
							if (!_ret.body.result) {
								_$$this.$data.codeCheckResult = true;
							}else{
								// 验证成功跳转
								location.href = '../geelypc/list.html?mobile=' + _$$this.$data.mobile;
							}
						}).catch((_err) =>{
							_$$this.$message.error('服务器出错了');
						})
					}
					}
			},
			// 验证码按钮进入倒计时状态
			codeSucc () {
				var _$$this = this;
				_$$this.$data.canCode = true;
				_$$this.$data.maxTime = 60;
				var timer = setInterval(function(){
					_$$this.$data.maxTime--;
					_$$this.$data.codeBtnText = _$$this.$data.maxTime + 's';
					if (_$$this.$data.maxTime === 0){
						_$$this.$data.codeBtnText = '验证码';
						clearInterval(timer);
						_$$this.$data.canCode = false;
					}
				}, 1000)
			}
		}
	}

</script>

<style>
	.g-main{
		margin: 0 auto;
		margin-top: 120px;
		width: 28%;
		min-width: 400px;
	}
	.m-name{
		width: 100%;
		text-align: center;
		margin: 30px auto;
		margin-bottom: 50px;  
	}
	.f-name span {
		font-size: 34px;
		letter-spacing: 16px;
		color: #8391a5;
	}
	img{
		width: 100%;
	}
	.m-query{
		width: 100%;
		min-height: 240px;
	}	
	.el-tabs--border-card{
		border: 0;
		box-shadow: none;
	}
	.el-tabs__nav{
		width: 100%;
	}
	.el-tabs__item{
		width: 50%;
		text-align: center;
	}	
	.el-tabs--border-card > .el-tabs__header .el-tabs__item{
		margin-right: 0;
		margin-left: 0;
		border: 0;
	}
	.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active{
		background-color: #d1dbe5;
		border-bottom: 5px solid #2c6fa0;
	}
	.el-tabs--border-card > .el-tabs__content{
		padding: 0;
		margin: 30px 0;
	}
	.el-tabs__item.is-active{
		color: #2c6fa0;
	}
	.el-row{
		margin: 10px 0;
	}
	.m-btn{
		margin-top: 30px;
	}
	.el-button{
		width: 100%;
		background-color: #2c6fa0;
		border-color: #2c6fa0;
	}
	.el-button--primary:focus, .el-button--primary:hover{
		background: #3d8cc5;
    	border-color: #3d8cc5;
    	color: #fff;
	}
	.tips{
		color: red;
	}
</style>