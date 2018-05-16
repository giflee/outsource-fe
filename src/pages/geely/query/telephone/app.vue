<template>
	<div id="app" class="g-main">
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
		<br>
		<el-row :gutter="20">
			<el-col :span="16">
				<el-input v-model="code" placeholder="短信验证码" @input.native="checkCode" :maxlength="6"></el-input>
			</el-col>
			<el-col :span="8">
				<el-button id="btnSendCode" @click="getCode" :disabled="canCode">{{codeBtnText}}</el-button>
			</el-col>
		</el-row>
		<el-row v-if="codeCheckResult">
			<span class="tips">输入验证码有误</span>
		</el-row>
		<p>*首次用手机号码查询将自动为您绑定</p>
		<br>
		<el-row :gutter="20">
			<el-col :span="24">
				<el-button type="primary" @click="bindMobile" class="m-bind-btn">绑定手机号码</el-button>
			</el-col>
		</el-row>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				code: '',
				phoneCheckResult: false,
				codeCheckResult: false,
				codeBtnText: '验证码',
				canCode: false,
				codeCheckLength: false,
				getCodeError: false
			}
		},
		created: function() {
			this.checkCookie();
		},
		methods: {
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
							_$$this.$toast(_ret.body.message);
						}
						else{
							this.codeSucc();
							_$$this.$data.getCodeError = false;
						}
					}).catch((_err) => {
						_$$this.$toast('服务器出错');
					})
				}
				
			},
			bindMobile() {
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
								location.href = '../worksheet/list.html?mobile=' + _$$this.$data.mobile;
							}
						}).catch((_err) =>{
							_$$this.$toast('服务器出错');
						})
					}
					}
			},
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
			},
			// 手机号验证
			checkMobile() {
				this.$data.phoneCheckResult = false;
				var partten1 = /^1$/;
				var partten2 = /^1\d*\d$/;
				//只校验是不是1开头的手机号
				if(this.$data.mobile != ""){
					if (partten1.test(this.$data.mobile) || partten2.test(this.$data.mobile)){
					this.$data.phoneCheckResult = false;
					}else{
						this.$data.phoneCheckResult = true;
					}
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
			getCookie(c_name) {
            	if (document.cookie.length>0) {
                    var c_start = document.cookie.indexOf(c_name + "=")
                    if (c_start!=-1) {
            			return true;
                    }
                }
                return false;
            },
            checkCookie() {
                var strtoken = this.getCookie('geely_auth_token');
                if (strtoken) {
                    location.href = '../worksheet/list.html';
                }
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
    left: 50%;
    top: 40%;
    transform: translate(-50%,-50%);
}
.m-bind-btn {
	width: 265px;
	height: 36px;
}
.tips{
	color:red;
}
		
</style>