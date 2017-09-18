<template>
    <div id="app" class="g-main">
        <div class="m-list">
            <span>状态筛选</span>
            <el-select v-model="filter" placeholder="输入工单状态" style="padding-bottom: 10px"
                       @change="optionChange">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
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
                <el-table-column label="创建时间">
                    <template scope="scope">
                        <span>{{ scope.row.createTime | date}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="评价状态">
                    <template scope="scope">
                        <span>{{ !!scope.row.isEvaluated ? '已评价':'未评价'}}</span>
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
    import moment from 'moment';
    import util from '../../../../util';

    export default {
        data() {
            return {
                tableData: [],
                options: [{
                    label: '全部', value: 0,
                }, {
                    label: '已完结', value: 1,
                }, {
                    label: '受理中', value: 2,
                }],
                filter: 0,
                noPagination: false,
                total: 0,
                currentPage: 1,
                pageSize: 10,
            }
        },

        created: function () {
            this.init();
            this.getList(1, 10);
        },

        methods: {
            worksheetQuery(val) {
                const filter = {
                    id: val.id
                };
                this.$http.get('/geely/api/ticket/get/', {
                    emulateJSON: true,
                    params: filter
                }).then((_ret) => {
                    if (_ret.body.code === 200) {
                        window.location.href = '../geelypc/details.html?id=' + val.id
                    }
                }).catch((_err) => {
                    console.log(_err);
                })
            },

            init() {
                const urlObj = util.parseQueryString(location.search);
                this.mobile = urlObj.mobile;
            },

            //select change
            optionChange() {
                this.currentPage = 1;
                this.getList(this.currentPage, this.pageSize);
            },

            // 读取
            getList: function (pageNum, pageSize) {
                const filter = {
                    filter: this.filter,
                    offset: (pageNum - 1) * pageSize,
                    limit: pageSize,
                    time: new Date().getTime()
                };
                this.$http.get('/geely/api/worksheet/list', {
                    emulateJSON: true,
                    params: filter
                }).then((_ret) => {
                    if (_ret.body.code === 200) {
                        this.tableData = _ret.body.result;
                        this.total = _ret.body.total;
                        this.noPagination = !!_ret.body.total;
                    }
                }, () => {
                    console.log('failed');
                });
            },

            //  每页显示数据量变更
            handleSizeChange(val) {
                this.pageSize = val; // 每页的条数
                if (this.currentPage !== 1) {
                    this.currentPage = 1;
                } else {
                    this.getList(this.currentPage, this.pageSize);
                }
            },

            //  页码变更
            handleCurrentChange(val) {
                this.currentPage = val; //当前的页码
                this.getList(this.currentPage, this.pageSize);
            }
        },
        filters: {
            date: function (value) {
                return moment(value).format('YYYY-MM-DD HH:mm:ss');
            },

            status: function (value) {
                const map = {
                    5: '受理中',
                    10: '受理中',
                    20: '已完结',
                    25: '受理中'
                };
                return map[value];
            },
        }
    }

</script>

<style>
    .g-main {
        margin: 0 auto;
    }

    .m-list {
        width: 78%;
        min-width: 1050px;
        margin: 150px auto;
        overflow: hidden;

    }

    .el-table {
        overflow-x: hidden;
    }

    .m-block {
        padding-top: 10px;
    }

    .el-table {
        border-left: 0;
        border-right: 0;
    }

    .el-table::after {
        width: 0;
    }

    .el-table__body-wrapper {
        overflow-x: hidden;
    }

    .el-table .cell, .el-table th > div {
        padding: 0 10px;
    }

    .el-table td.el-table_1_column_1 .cell {
        overflow: initial;
    }

    .el-table td.el-table_1_column_1 .cell > span {
        white-space: nowrap;
        overflow: auto;
    }
</style>