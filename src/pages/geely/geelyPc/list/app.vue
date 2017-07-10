<template>
	<div id="app"  class="g-main"> 
		<div class="m-list">
			<el-table
			stripe
			:data="tableData"
			@row-click="worksheetQuery">
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
	      		<el-table-column  label="创建时间">
	      			<template scope="scope">
	      				<span>{{ scope.row.createTime | date}}</span>
	      			</template>
	      		</el-table-column>
	      		<el-table-column label="评价状态">
	      			<template scope="scope">
	      				<span>{{ scope.row.isEvaluated | evaluated}}</span>
	      			</template>
	      		</el-table-column> 
	      		<el-table-column label="订单详情" @click="worksheetQuery">
	      			<template scope="scope">
	      				<el-button @click="worksheetQuery" type="text">查看</el-button>
	      			</template>
	      		</el-table-column>
			</el-table>
			<div class="m-block">
		    <el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="currentPage"
		      :page-sizes="[5,10, 15, 20, 25]"
		      :page-size="10"
		      layout="total, sizes, prev, pager, next"
		      :total="$data.total">
		    </el-pagination>
		  </div>
		</div>
		
	</div>
</template>

<script>
const util = require('../../../../util.js')
const moment = require('moment')
export default {
	data() {
		return {
			 tableData:[
			
			],
	        currentPage: 1
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
						window.location.href = '../geelypc/details.html?id=' + val.id
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
					if(_ret.body.result.length){
						_$$this.$data.total = _ret.body.result.length;
					}else{
						_$$this.$data.total = 0;
					}
					this.$forceUpdate();
				}
			}))
		},
		handleSizeChange(val) {
			debugger;
	        console.log(`每页 ${val} 条`);
	    },
	    handleCurrentChange(val) {
	    	debugger;
	   	    console.log(`当前页: ${val}`);
	    }
	},
	filters: {
		date: function(value) {
			return moment(value).format('YYYY-MM-DD HH:mm:ss');
		},
		status: function(value) {
			var map = {
				5 : '受理中',
				10 : '受理中',
				20 : '已完结',
				25 : '受理中'
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
.g-main{
	margin: 0 auto;
}
.m-list{
	position: absolute;
	width: 78%;
	height: 60%;
	left: 11%;
	top: 16%
}
.m-block{
	margin-top: 10px;
}
.el-table{
	border-left: 0;
	border-right: 0;
}
.el-table::after{
	width: 0;
}
.el-table .cell, .el-table th > div {
    padding: 0 10px;
}
.el-table td.el-table_1_column_1 .cell{
	overflow: initial;
}
.el-table td.el-table_1_column_1 .cell > span {
	white-space: nowrap;
    overflow: auto;
} 
</style>