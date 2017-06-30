<template>
	<div id="app" class="g-main">
		<el-row :gutter="20">
			<el-col :span="24">
				<el-input v-model="worksheetno" placeholder="请输入工单号码"></el-input>
			</el-col>
		</el-row>
		<el-row v-if="getworksheet">
			<span>此工单号不存在，请重新输入</span>
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
				worksheetno: '2718282374122',
				getworksheet: false
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
				_$$this.$http.get('/geely/api/ticket/get/',{
					emulateJSON: true,
					params: filter
				}).then((_ret) => {
					console.log(_ret);
					if(_ret.body.code == 200){
						location.href = '/geely/worksheet/details.html?id=' + id
					}
				}).catch((_err) => {
					console.log(_err);
				})
			},
			init() {
				var urlObj = util.parseQueryString(location.search);
				console.log(urlObj);
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