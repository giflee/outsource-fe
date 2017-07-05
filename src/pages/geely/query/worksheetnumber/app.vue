<template>
	<div id="app" class="g-main">
		<el-row :gutter="20">
			<el-col :span="24">
				<el-input v-model="worksheetno" @input.native="checkWorksheetno" placeholder="请输入工单号码" 
				:maxlength="13"></el-input>
			</el-col>
		</el-row>
		<el-row v-if="worksheetnoCheck">
			<span class="tips">输入工单号有误</span>
		</el-row>
		<br>
		<br>
		<el-row :gutter="20">
			<el-col :span="24">
				<el-button type="primary" @click="worksheetQuery" class="m-bind-btn">工单查询</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	const util = require('../../../../util.js')
	export default {
		data() {
			return {
				worksheetno: '',
				worksheetnoCheck: false
			}
		},
		created: function() {
			this.init();
		},
		methods: {
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
							location.href = '../worksheet/details.html?id=' + id
						}else if(_ret.body.code == 903){
							_$$this.$data.worksheetnoCheck = true;
						}
					}).catch((_err) => {
						console.log(_err);
					})
				}	
			},
			init() {
				var urlObj = util.parseQueryString(location.search);
				console.log(urlObj);
			},
			checkWorksheetno() {
				this.$data.worksheetnoCheck = false;
				this.$data.worksheetno = (isNaN(parseInt(this.$data.worksheetno)) || this.$data.worksheetno==0)?'':parseInt(this.$data.worksheetno);
			},
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
	color: red;
}	
</style>