<template>
    <div id="app" class="g-main">
        <el-collapse v-for="(keep,index) in keeps" v-model="activeNames" accordion>
            <el-collapse-item :title="'保养记录-'+(keep.serviceProxyCode||'')" :name="index">
                <el-form class="m-keep">
                    <el-form-item label="预约单号">
                        <span>{{keep.serviceProxyCode}}</span>
                    </el-form-item>
                    <el-form-item label="当前表类型">
                        <span>{{keep.cureentType}}</span>
                    </el-form-item>
                    <el-form-item label="服务经销商名">
                        <span>{{keep.dealerName}}</span>
                    </el-form-item>
                    <el-form-item label="维修经销商名">
                        <span>{{keep.maintainDealerName}}</span>
                    </el-form-item>
                    <el-form-item label="服务顾问名">
                        <span>{{keep.serviceAdvisorName}}</span>
                    </el-form-item>
                    <el-form-item label="客户到店时间">
                        <span>{{keep.arrivalOn}}</span>
                    </el-form-item>
                    <el-form-item label="客户要求">
                        <span>{{keep.customerComment}}</span>
                    </el-form-item>
                    <el-form-item label="里程数">
                        <span>{{keep.mileage}}</span>
                    </el-form-item>
                    <el-form-item label="预计交车时间">
                        <span>{{keep.expectFinishAt |dateFilter}}</span>
                    </el-form-item>
                    <el-form-item label="计划开始维修时间">
                        <span>{{keep.expectStartAt |dateFilter}}</span>
                    </el-form-item>
                    <el-form-item label="实际开始维修时间">
                        <span>{{keep.startAt |dateFilter}}</span>
                    </el-form-item>
                    <el-form-item label="完工时间">
                        <span>{{keep.finishAt | dateFilter}}</span>
                    </el-form-item>
                    <el-form-item label="是否提交">
                        <span>{{keep.isSubmit}}</span>
                    </el-form-item>
                    <el-form-item label="是否维修履历">
                        <span>{{keep.isRecord}}</span>
                    </el-form-item>
                    <el-form-item label="追加审核状态">
                        <span>{{keep.addStatus}}</span>
                    </el-form-item>
                    <el-form-item label="追加描述">
                        <span>{{keep.addComment}}</span>
                    </el-form-item>
                    <el-form-item label="预警等级">
                        <span>{{keep.alarmLevel}}</span>
                    </el-form-item>
                    <el-form-item label="提车证明">
                        <span>{{keep.getProve}}</span>
                    </el-form-item>
                    <el-form-item label="中断类型">
                        <span>{{keep.pauseType}}</span>
                    </el-form-item>
                    <el-form-item label="机修钣喷操作状态">
                        <span>{{keep.opStatus}}</span>
                    </el-form-item>
                    <el-form-item label="机修部分">
                        <span>{{keep.repairParts}}</span>
                    </el-form-item>
                    <el-form-item label="钣喷部分">
                        <span>{{keep.sprayParts}}</span>
                    </el-form-item>
                    <el-form-item label="钣喷状态">
                        <span>{{keep.bpStatus}}</span>
                    </el-form-item>
                    <el-form-item label="保修状态">
                        <span>{{keep.clmStatus}}</span>
                    </el-form-item>
                    <el-form-item label="状态">
                        <span>{{keep.status}}</span>
                    </el-form-item>
                    <el-form-item label="删除标志">
                        <span>{{keep.isDeleted}}</span>
                    </el-form-item>
                    <el-form-item label="备注">
                        <span>{{keep.comments}}</span>
                    </el-form-item>
                    <el-form-item label="创建人">
                        <span>{{keep.createdBy}}</span>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <span>{{keep.createdOn | dateFilter}}</span>
                    </el-form-item>
                    <el-form-item label="修改人">
                        <span>{{keep.modifiedBy}}</span>
                    </el-form-item>
                    <el-form-item label="修改时间">
                        <span>{{keep.modifiedOn | dateFilter}}</span>
                    </el-form-item>
                    <el-form-item label="维修委托书工单类型">
                        <span>{{keep.proxyOrderType}}</span>
                    </el-form-item>

                    <el-collapse v-for="(x,i) in keep.serviceOrder" accordion>
                        <el-collapse-item :title="'维修工单-'+i">
                            <el-form-item label="工单类型">
                                <span>{{x.serviceType}}</span>
                            </el-form-item>
                            <el-form-item label="工单熟悉">
                                <span>{{x.serviceOrderProperty}}</span>
                            </el-form-item>
                            <el-form-item label="维修内容">
                                <span>{{x.serviceContent}}</span>
                            </el-form-item>
                            <el-form-item label="委托书编号">
                                <span>{{x.serviceProxyCode}}</span>
                            </el-form-item>
                            <el-form-item label="系统单号">
                                <span>{{x.systemOrder}}</span>
                            </el-form-item>
                            <el-form-item label="是否有追加">
                                <span>{{x.isHaveAdd}}</span>
                            </el-form-item>
                            <el-form-item label="追加审核状态">
                                <span>{{x.addStatus}}</span>
                            </el-form-item>
                            <el-form-item label="维修项折扣">
                                <span>{{x.maintainDiscount}}</span>
                            </el-form-item>
                            <el-form-item label="零件折扣">
                                <span>{{x.partDiscount}}</span>
                            </el-form-item>
                        </el-collapse-item>
                    </el-collapse>
                </el-form>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    import moment from 'moment';
    import util from '../../../../util';

    export default {
        data() {
            return {
                keeps: [{
                    keepCode: '',
                }],
                activeNames: [0],
            }
        },

        created: function () {
            this.getkeep();
        },

        methods: {
            getkeep() {
                this.$http.get('/gl2/api/maintenanceHistory/query', {
                    emulateJson: true,
                    params: util.parseQueryString(location.search)
                }).then((_ret) => {
                    if (_ret.body.code === 200) {
                        if (!!_ret.body.result.length) {
                            this.keeps = _ret.body.result
                        }
                    } else {
                        this.$message.error(_ret.body.message);
                    }
                }).catch((_ret) => {
                    this.$message.error('服务器出错了');
                })
            },
        },

        filters: {
            dateFilter: function (value) {
                if (!value) return '';
                return moment(value).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }
</script>
<style lang="scss">
    body {
        margin: 0;
        padding: 0;
    }

    .g-main {
        .el-collapse {
            .el-collapse-item {
                .el-collapse-item__wrap {
                    .m-keep {
                        .el-form-item {
                            margin-bottom: 0;
                            label {
                                width: 110px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>