<template>
	<div id="app">
		<el-table
		:data="tableData"
		@current-change="worksheetquery(scope.$index, scope.row)">
      		<el-table-column  label="创建时间">
      			<template scope="scope">
      				<span>{{ scope.row.createTime }}</span>
      			</template>
      		</el-table-column>
      		<el-table-column label="工单号">
      			<template scope="scope">
      				<span>{{ scope.row.worksheetno }}</span>
      			</template>
      		</el-table-column>
      		<el-table-column label="工单状态">
      			<template scope="scope">
      				<span>{{ scope.row.status }}</span>
      			</template>
      		</el-table-column>
      		<el-table-column label="评价状态">
      			<template scope="scope">
      				<span>{{ scope.row.evaluate }}</span>
      			</template>
      		</el-table-column> 
		</el-table>
	</div>
</template>

<script>
const util = require('../../../../util.js')
export default {
	data() {
		return {
			tableData:[{
				createTime:'111111',
				worksheetno: "1234555",
				status: '0',
				evaluate: '1'
			}]
		}
	},
	created: function() {
			this.init();
		},
		methods: {
			worksheetQuery(index,row) {
				console.log(index, row)
				var _$$this = this;
				var filter = {
					id: _$$this.$data.worksheetno,
				};
				_$$this.$http.get('/geely/api/ticket/get/',{
					emulateJSON: true,
					params: filter
				}).then((_ret) => {
					console.log(_ret);
				}).catch((_err) => {
					console.log(_err);
				})
			},
			init() {
				var urlObj = util.parseQueryString(location.search);
				console.log("hhahhhhaaa");
				console.log(urlObj);
			}
		}
}

</script>
<style>
	
</style>