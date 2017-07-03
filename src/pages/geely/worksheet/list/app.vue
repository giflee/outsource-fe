<template>
	<div id="app"  class="g-main">
		<el-table
		:data="tableData"
		@row-click="worksheetQuery">
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
				worksheetno: "2718282374122",
				status: '0',
				evaluate: '1'
			},
			{
				createTime:'111111',
				worksheetno: "2718282374122",
				status: '0',
				evaluate: '1'
			}
			]
		}
	},
	created: function() {
			this.init();
		},
		methods: {
			worksheetQuery(val) {
				var _$$this = this;
		        var filter = {
						id: val.worksheetno
					};
		        _$$this.$http.get('/geely/api/ticket/get/',{
						emulateJSON: true,
						params: filter
					}).then((_ret) => {
						if(_ret.body.code == 200){
							debugger;
							window.location.href = '../worksheet/details.html?id=' + val.worksheetno
						}
					}).catch((_err) => {
						console.log(_err);
					})
	      },
			init() {
				var urlObj = util.parseQueryString(location.search);
			}
		}
}

</script>
<style>
	
</style>