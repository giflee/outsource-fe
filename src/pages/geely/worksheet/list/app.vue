<template>
    <div id="app" class="g-main">
        <div class="content">
            <!--工单筛选-->
            <mt-header fixed title="工单列表">
                <mt-button slot="right" @click.navtive="filterPopup = true;">筛选</mt-button>
            </mt-header>
            <mt-popup v-model="filterPopup"
                      popup-transition="popup-fade"
                      position="bottom"
                      class="mint-datetime">
                <mt-picker show-toolbar :slots="slots" @change="onValuesChange" :valueKey="valueKey"
                           class="mint-datetime-picker picker-filter">
                    <span class="mint-datetime-action mint-datetime-cancel" @click="filterPopup = false;">取消</span>
                    <span class="mint-datetime-action mint-datetime-confirm" @click="pickFilter">确定</span>
                </mt-picker>
            </mt-popup>

            <!--日期选择-->
            <mt-popup v-model="monthPopup"
                      popup-transition="popup-fade"
                      position="bottom"
                      class="mint-datetime">
                <mt-picker :slots="monthSlots" @change="onMonthChange" class="mint-datetime-picker"
                           show-toolbar>
                    <span class="mint-datetime-action mint-datetime-cancel" @click="defaultMonth">全部</span>
                    <span class="mint-datetime-action mint-datetime-confirm"
                          @click="pickMonth">确定</span>
                </mt-picker>
            </mt-popup>
            <mt-cell :title="monthTitle" style="margin-top: 40px">
                <span @click="monthPopup = true;">其他月份 ></span>
            </mt-cell>

            <!--table-->
            <el-table
                    :data="tableData"
                    :empty-text="emptyText"
                    @row-click="worksheetQuery" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
                    infinite-scroll-distance="5">
                <el-table-column label="创建时间" width="100">
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
                        <span>{{!!scope.row.isEvaluated ? '已评价' : '未评价'}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <p v-show="loading" class="page-infinite-loading">
                <mt-spinner type="fading-circle"></mt-spinner>
            </p>
            <p v-show="allLoaded && (current > 1 || (pageTotal < limit && pageTotal > 0 ))" class="page-infinite-loading">
                没有更多了
            </p>
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
                filterPopup: false, //筛选选择
                monthPopup: false, //月份选择
                loading: false,
                current: 0,
                limit: 15,
                allLoaded: false,
                pageNum: 0,
                pageTotal: 0,
                slots: [{
                    flex: 1,
                    defaultIndex: 2,
                    values: [{
                        label: '全部', value: 0,
                    }, {
                        label: '已完结', value: 1,
                    }, {
                        label: '受理中', value: 2,
                    }],
                    textAlign: 'center',
                }],
                monthSlots: [{
                    flex: 1,
                    values: [],
                    defaultIndex: 5,
                    className: 'slot1',
                    textAlign: 'center'
                }, {
                    divider: true,
                    content: '-',
                    className: 'slot2'
                }, {
                    flex: 1,
                    defaultIndex: 1,
                    values: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                    className: 'slot3',
                    textAlign: 'center'
                }],
                valueKey: 'label',
                filter: 0, //筛选项
                startTime: '', //月份筛选项
                endTime: '',
                monthTitle: '全部',
                selected: {
                    startTime: '',
                    endTime: '',
                    filter: 0
                },
                startYear: 2017,
                endYear: new Date().getFullYear(),
            }
        },

        created: function () {
            for (let i = this.startYear; i <= this.endYear; i++) {
                this.monthSlots[0].values.push(i)
            }

            // mint-ui 真垃圾
            this.$nextTick(()=>{
                const picker=document.querySelector('.picker-filter .picker-slot-wrapper');
                picker.style.transform='translate(0px,72px) translateZ(0px)';
            })
        },
        computed:{
            emptyText(){
                return this.loading ? '加载中':'暂无数据';
            }
        },
        methods: {

            /**
             *初始化数据
             */
            initData() {
                this.tableData = [];
                this.pageNum = 0;
                this.pageTotal = 0;
                this.current = 0;
                this.allLoaded = false;
            },

            pickFilter() {
                this.filter = this.selected.filter;

                this.initData();
                this.loadMore();
                this.filterPopup = false;
            },

            /**
             * 日期筛选确定按钮
             */
            pickMonth() {
                this.startTime = this.selected.startTime;
                this.endTime = this.selected.endTime;
                this.monthTitle = !!this.selected.startTime ? moment(this.startTime).format('YYYY-MM') : '全部';
                this.initData();
                this.loadMore();
                this.monthPopup = false;
            },

            /**
             * 还原默认日期
             */
            defaultMonth() {
                this.startTime = this.endTime = '';
                this.monthTitle = '全部';
                this.initData();
                this.loadMore();
                this.monthPopup = false;
            },

            /**
             * 日期筛选改变
             * @param picker
             * @param values
             */
            onMonthChange(picker, values) {
                if (values[0] && values[1]) {
                    this.selected.startTime = new Date(`${values[0]}-${values[1]}-01`).setHours(0, 0, 0, 0);
                    this.selected.endTime = new Date(`${values[0]}-${values[1]}-${new Date(values[0], values[1], 0).getDate()}`).setHours(23, 59, 59, 59);
                    this.selected.monthTitle = moment(this.monthFilter).format('YYYY-MM');
                } else {
                    this.$nextTick(() => {
                        const d = new Date().getMonth() + 1;
                        const month = d > 9 ? '' + d : '0' + d;
                        picker.setSlotValue(0, this.endYear);
                        picker.setSlotValue(1, month);
                    })
                }
            },

            /**
             * 展示筛选改变
             * @param picker
             * @param values
             */
            onValuesChange(picker, values) {
                if (values[0]) {
                    this.selected.filter = values[0].value;
                }
            },

            /**
             * 跳转
             * @param val
             */
            worksheetQuery(val) {
                const filter = {
                    id: val.id
                };
                this.$http.get('/geely/api/ticket/get/', {
                    emulateJSON: true,
                    params: filter
                }).then((_ret) => {
                    if (_ret.body.code === 200) {
                        window.location.href = '../worksheet/details.html?id=' + val.id
                    }
                }).catch((_err) => {
                    console.log(_err);
                })
            },

            /**
             * 加载更多
             */
            loadMore() {
                this.loading = true;
                // 分页的页数
                this.pageNum = parseInt(this.pageTotal / this.limit);
                this.offset = (this.limit) * (this.current);
                // 小于当前页
                if (this.current <= this.pageNum) {
                    setTimeout(() => {
                        this.$http.get('/geely/api/worksheet/list', {
                            emulateJSON: true,
                            params: {
                                offset: this.offset,
                                limit: this.limit,
                                filter: this.filter,
                                startTime: this.startTime,
                                endTime: this.endTime
                            }
                        }).then((_ret => {
                            if (_ret.body.code === 200) {
                                this.tableData = this.tableData.concat(_ret.body.result);
                                // get total
                                this.pageTotal = _ret.body.total;
                                this.loading = false;
                                this.current = this.current + 1;
                            }
                        }))
                    }, 500)
                } else {
                    this.allLoaded = true;
                    this.loading = false;
                }
            }
        },

        filters: {
            date: function (value) {
                return moment(value).format('YYYY-MM-DD');
            },

            time: function (value) {
                return moment(value).format('HH:mm:ss');
            },

            status: function (value) {
                const map = {
                    5: '受理中',
                    10: '受理中',
                    20: '已完结',
                    25: '受理中'
                };
                return map[value];
            }
        }
    }

</script>
<style lang="scss">
    .el-table .cell, .el-table th > div {
        padding: 0 10px;
    }

    .el-table td.el-table_1_column_1 .cell {
        overflow: initial;
        text-align: center;
    }

    .el-table td.el-table_1_column_1 .cell > span {
        white-space: nowrap;
        overflow: auto;
    }

    .content {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow-y: auto;
        padding-bottom: 20px;
    }

    .page-infinite-loading {
        text-align: center;
    }

    .mint-spinner-fading-circle {
        margin: 8px auto;
    }
</style>