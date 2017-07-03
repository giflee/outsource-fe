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
		<br>
		<el-row :gutter="20">
			<el-col :span="16">
				<el-input v-model="code" placeholder="短信验证码"></el-input>
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
				codeCheckResult: false,
				codeBtnText: '验证码',
				canCode: false
			}
		},
		methods: {
			getCode() {
				var _$$this = this;
				var filter = {
					phone: _$$this.$data.mobile,
				}
				if(_$$this.$data.mobile == 0 || (_$$this.$data.mobile.toString()).length < 11){
					_$$this.$data.phoneCheckResult = true;
				}else{
					_$$this.$http.get('/geely/api/getCode/', {
					emulateJSON: true,
					params: filter
				}).then((_ret) =>{
					console.log(_ret);
					if(!_ret.body.result){
						_$$this.$data.codeCheckResult = true;
					}
					else{
						console.log("success");
						this.codeSucc();
					}
				}).catch((_err) => {
					console.log(_err);
				})
				}
				
			},
			bindMobile() {
				var _$$this = this;
				var filter = {
					phone: _$$this.$data.mobile,
					code: _$$this.$data.code
				};
				debugger;
				if(_$$this.$data.code == 0){
					_$$this.$data.codeCheckResult = true;
				}
				_$$this.$http.get('/geely/api/codeCheck/',{
					emulateJSON: true,
					params: filter
				}).then((_ret) =>{
					console.log(_ret);
					if (!_ret.body.result) {
						_$$this.$data.codeCheckResult = true;
					}else{
						// 验证成功跳转
						location.href = '/geely/worksheet/list.html?mobile=' + _$$this.$data.mobile;
					}
				}).catch((_err) =>{
					console.log(_err);
				})
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
			checkMobile() {
				this.$data.mobile = (isNaN(parseInt(this.$data.mobile)) || this.$data.mobile==0)?'':parseInt(this.$data.mobile);
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