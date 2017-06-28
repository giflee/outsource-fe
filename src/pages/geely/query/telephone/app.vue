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
				<el-input v-model="code" @click="getCode" placeholder="短信验证码"></el-input>
			</el-col>
			<el-col :span="8">
				<el-button>验证码</el-button>
			</el-col>
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
				mobile: 13088883333,
				code: '8743'
			}
		},
		methods: {
			getCode() {

			},
			bindMobile() {

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
    left: 15%;
    top: 25%;
}
.m-bind-btn {
	width: 265px;
	height: 36px;
}
		
</style>