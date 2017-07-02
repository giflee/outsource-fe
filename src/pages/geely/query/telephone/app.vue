<template>
	<div id="app" class="g-main">
		<el-row :gutter="20">
			<el-col :span="24">
				<el-input placeholder="请输入手机号码" v-model="mobile" @input.native="checkMobile" :maxlength="11"></el-input>
			</el-col>
		</el-row>
		<br>
		<el-row :gutter="20">
			<el-col :span="16">
				<el-input v-model="code" placeholder="短信验证码"></el-input>
			</el-col>
			<el-col :span="8">
				<el-button id="btnSendCode" @click="getCode">验证码</el-button>
			</el-col>
		</el-row>
		<el-row v-if="getCodeResult">
			<span>短信验证码发送失败，请重新发送</span>
		</el-row>
		<p>*首次用手机号码查询将自动为您绑定</p>
		<br>
		<el-row :gutter="20">
			<el-col :span="24">
				<el-button type="primary" @click="bindMobile" class="m-bind-btn">绑定手机号码</el-button>
			</el-col>
		</el-row>
		<el-row v-if="codeCheckResult">
			<span>短信验证码不正确，请重新输入</span>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '18668221937',
				code: '8743',
				getCodeResult: false,
				codeCheckResult: false
			}
		},
		methods: {
			getCode() {
				var _$$this = this;
				// curCount = count;
				// const el = document.getElementById("btnSendCode");
				// el.setAttribute("disabled","true" );//设置按钮为禁用状态
				// el.value="请在" + curCount + "后重新获取";//更改按钮文字
				// InterValObj = window.setInterval(SetRemainTime, 1000); // 启动计时器timer处理函数，1秒执行一次
				var filter = {
					phone: _$$this.$data.mobile,
				}
				_$$this.$http.get('/geely/api/getCode/', {
					emulateJSON: true,
					params: filter
				}).then((_ret) =>{
					console.log(_ret);
					debugger;
					if(!_ret.body.result){
						_$$this.$data.getCodeResult = true;
					}
					else{
						console.log("success");
					}
				}).catch((_err) => {
					console.log(_err);
				})
			},
			bindMobile() {
				var _$$this = this;
				var filter = {
					phone: _$$this.$data.mobile,
					code: _$$this.$data.code
				};
				_$$this.$http.get('/geely/api/codeCheck/',{
					emulateJSON: true,
					params: filter
				}).then((_ret) =>{
					console.log(_ret);
					debugger;
					if (!_ret.body.result) {
						_$$this.$data.codeCheckResult = true;
					}else{
						//绑定手机号成功，请求手机号绑定的订单列表
						_$$this.$http.get('/geely/api/worksheet/list/',{
							emulateJSON: true,
							params: _$$this.$data.mobile
						}).then((_ret) =>{
							console.log(_ret);
							if (!_ret.body.result) {
								//根据错误码，反馈对应的错误信息
								console.log("sorry!!!")
							}else{
								//请求列表成功，跳转到对应的列表页面
								location.href = '/geely/worksheet/list.html'
							}
						}).catch((_err) =>{
							console.log(_err);
						})
					}
				}).catch((_err) =>{
					console.log(_err);
				})
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
		
</style>