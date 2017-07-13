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
	      		<el-table-column label="订单详情">
	      			<template scope="scope">
	      				<el-button @click="worksheetQuery" type="text">查看</el-button>
	      			</template>
	      		</el-table-column>
			</el-table>
			<div class="m-block" v-if="noPagination">
		    <el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="currentPage"
		      :page-sizes="[5,10, 15, 20, 25]"
		      :page-size="pageSize"
		      layout="total, sizes, prev, pager, next"
		      :total="total">
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
			noPagination: false,
			total: 0,
	        currentPage: 1,
	        pageSize: 10,
		}
	},
	created: function() {
			this.init();
			this.getList(1,10);
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
		// 读取
		getList: function(pageNum, pageSize){
			var _$$this = this; 
			var filter = {
				offset:(pageNum-1)*pageSize, 
            	limit:pageSize
			}; 
            _$$this.$http.get('/geely/api/worksheet/list',{
            	emulateJSON: true,
				params: filter
            }).then(function(_ret){
            	if (_ret.body.code == 200) {
					_$$this.$data.tableData = _ret.body.result;
					_$$this.$data.total = _ret.body.total
					// 无数据不显示分页
					if(_ret.body.total){
						_$$this.$data.noPagination= true;
					}else{
						_$$this.$data.noPagination = false;
					}
       				_$$this.$forceUpdate();
       			}
            },function(){
                console.log('failed');
            });                 
        },
		//  每页显示数据量变更
		handleSizeChange(val) {
	        this.pageSize = val; // 每页的条数
            this.getList(this.currentPage, this.pageSize);
	    },
	    //  页码变更
	    handleCurrentChange(val) {
	   	    this.currentPage = val; //当前的页码
            this.getList(this.currentPage, this.pageSize);
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
	width: 78%;
	min-width: 1050px;
	margin: 150px auto;
	overflow: hidden;

}
.el-table{
	overflow-x: hidden;
}
.m-block{
	padding-top: 10px;
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