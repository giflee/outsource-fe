<template>
	<div id="app"  class="g-main">
		<el-table
		:data="tableData"
		@row-click="worksheetQuery">
      		<el-table-column  label="创建时间">
      			<template scope="scope">
      				<span>{{ scope.row.createTime | date}}</span>
      				<span>{{ scope.row.createTime | time}}</span>
      			</template>
      		</el-table-column>
      		<el-table-column label="工单号">
      			<template scope="scope">
      				<span>{{ scope.row.id }}</span>
      			</template>
      		</el-table-column>
      		<el-table-column label="工单状态">
      			<template scope="scope">
      				<span>{{ scope.row.actionStatus | status}}</span>
      			</template>
      		</el-table-column>
      		<el-table-column label="评价状态">
      			<template scope="scope">
      				<span>{{ scope.row.isEvaluated | evaluated}}</span>
      			</template>
      		</el-table-column> 
		</el-table>
	</div>
</template>

<script>
const util = require('../../../../util.js')
const moment = require('moment')
export default {
	data() {
		return {
			tableData:[

			]
		}
	},
	created: function() {
			this.init();
			this.getList();
		},
	methods: {
		worksheetQuery(val) {
			var _$$this = this;
	        var filter = {
					id: val.id
				};
	        _$$this.$http.get('/geely/api/ticket/get/',{
					emulateJSON: true,
					params: filter
				}).then((_ret) => {
					if(_ret.body.code == 200){
						window.location.href = '../worksheet/details.html?id=' + val.id
					}
				}).catch((_err) => {
					console.log(_err);
				})
      },
		init() {
			var urlObj = util.parseQueryString(location.search);
			this.$data.mobile = urlObj.mobile;
		},
		getList() {
			var _$$this = this;
			this.$http.get('/geely/api/worksheet/list', {
				emulateJSON: true
			}).then((_ret => {
				if (_ret.body.code == 200) {
					_.merge(_$$this.$data.tableData, _ret.body.result, true);
					this.$forceUpdate();
				}
			}))
		}
	},
	filters: {
		date: function(value) {
			return moment(value).format('YYYY-MM-DD');
		},
		time: function(value) {
			return moment(value).format('HH:mm:ss');
		},
		status: function(value) {
			var map = {
				5 : '未受理',
				10 : '受理中',
				20 : '已完结',
				25 : '已驳回'
			}
			return map[value];
		},
		evaluated: function(value) {
			var map = {
				false : '未评价',
				true : '已评价'
			}
			return map[value];
		}
	}
}

</script>
<style>
.el-table .cell, .el-table th > div {
    padding-right: 0;
}
.el-table td.el-table_1_column_1 .cell{
	overflow: initial;
	text-align: center;
}
.el-table td.el-table_1_column_1 .cell > span {
	white-space: nowrap;
    overflow: auto;
} 
</style>