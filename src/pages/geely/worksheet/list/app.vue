<template>
	<div id="app"  class="g-main">
		<div class="content">
			<el-table
			:data="tableData"
			@row-click="worksheetQuery" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="5">
	      		<el-table-column  label="创建时间"  width="100">
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
	      		<el-table-column label="工单状态" width="80">
	      			<template scope="scope">
	      				<span>{{ scope.row.actionStatus | status}}</span>
	      			</template>
	      		</el-table-column>
	      		<el-table-column label="评价状态" width="80">
	      			<template scope="scope">
	      				<span>{{ scope.row.isEvaluated | evaluated}}</span>
	      			</template>
	      		</el-table-column> 
			</el-table>
			<p v-show="loading" class="page-infinite-loading">
		        <mt-spinner type="fading-circle"></mt-spinner>
		        加载中...
		    </p>
		    <p v-show="allLoaded" class="page-infinite-loading">
		        没有更多了
		    </p>
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
			loading: false,
			current: 0,
			limit: 15,
			allLoaded: false,
			pageNum: 0,
			pageTotal:0
		}
	},
	created: function() {
			this.init();
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
		loadMore() {
			var _$$this = this;
			if (this.$data.current != 0) this.loading = true;
			// 分页的页数
			this.$data.pageNum = parseInt(this.$data.pageTotal/this.$data.limit);
			this.$data.offset = (this.$data.limit)*(this.$data.current);
			// 小于当前页
			if (this.$data.current <= this.$data.pageNum) {
				setTimeout(() => {
					this.$http.get('/geely/api/worksheet/list', {
						emulateJSON: true,
						params: {
							offset: this.$data.offset,
							limit: _$$this.$data.limit
						}
					}).then((_ret => {
						if (_ret.body.code == 200) {
							_$$this.$data.tableData = _$$this.$data.tableData.concat(_ret.body.result);
							// get total
							this.$data.pageTotal = _ret.body.total;
							this.loading = false;
							this.$data.current = this.$data.current+1;
							this.$forceUpdate();
						}
					}))
				}, 500)
			}else{
				this.$data.allLoaded = true;
				this.loading = false;
			}
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
.el-table .cell, .el-table th > div {
    padding: 0 10px;
}
.el-table td.el-table_1_column_1 .cell{
	overflow: initial;
	text-align: center;
}
.el-table td.el-table_1_column_1 .cell > span {
	white-space: nowrap;
    overflow: auto;
} 
.content{
	position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    overflow-y: auto;
    padding-bottom: 20px;
}
.page-infinite-loading{
	text-align: center;
}
.mint-spinner-fading-circle{
	margin: 8px auto;
}
</style>