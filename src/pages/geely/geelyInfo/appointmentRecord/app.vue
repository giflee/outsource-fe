<template>
    <div id="app" class="g-main">
        <el-collapse v-for="(appointment,index) in appointments" v-model="activeNames" accordion>
            <el-collapse-item :title="'预约单号-'+appointment.appointmentCode" :name="index">
                <el-form class="m-appointment">
                    <el-form-item label="预约单号">
                        <span>{{appointment.appointmentCode}}</span>
                    </el-form-item>
                    <el-form-item label="预约进厂时间">
                        <span>{{appointment.appointmentAt}}</span>
                    </el-form-item>
                    <el-form-item label="预约来源">
                        <span>{{appointment.appointmentSource}}</span>
                    </el-form-item>
                    <el-form-item label="系统单号">
                        <span>{{appointment.systemOrder}}</span>
                    </el-form-item>
                    <el-form-item label="经销商名">
                        <span>{{appointment.dealerName}}</span>
                    </el-form-item>
                    <el-form-item label="服务顾问名">
                        <span>{{appointment.serviceName}}</span>
                    </el-form-item>
                    <el-form-item label="客户预约描述">
                        <span>{{appointment.appointmentDescript}}</span>
                    </el-form-item>
                    <el-form-item label="里程数">
                        <span>{{appointment.mileage}}</span>
                    </el-form-item>
                    <el-form-item label="预约维修开始时间">
                        <span>{{appointment.maintainStartAt}}</span>
                    </el-form-item>
                    <el-form-item label="预约维修结束时间">
                        <span>{{appointment.maintainEndAt}}</span>
                    </el-form-item>
                    <el-form-item label="取消原因">
                        <span>{{appointment.cancelReason}}</span>
                    </el-form-item>
                    <el-form-item label="取消人id">
                        <span>{{appointment.cancelBy}}</span>
                    </el-form-item>
                    <el-form-item label="状态">
                        <span>{{appointment.status}}</span>
                    </el-form-item>
                    <el-form-item label="创建人">
                        <span>{{appointment.createdBy}}</span>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <span>{{appointment.createdOn |dateFilter}}</span>
                    </el-form-item>
                    <el-form-item label="修改人">
                        <span>{{appointment.modifiedBy}}</span>
                    </el-form-item>
                    <el-form-item label="修改时间">
                        <span>{{appointment.modifiedOn |dateFilter}}</span>
                    </el-form-item>
                    <el-form-item label="预约工单类型">
                        <span>{{appointment.oderType}}</span>
                    </el-form-item>
                    <el-form-item label="变更原因">
                        <span>{{appointment.changeReason}}</span>
                    </el-form-item>
                    <el-form-item label="预约类型">
                        <span>{{appointment.appointmentType}}</span>
                    </el-form-item>
                    <el-form-item label="状态">
                        <span>{{appointment.status}}</span>
                    </el-form-item>
                    <el-form-item label="预约内容">
                        <span>{{appointment.appointmentContent}}</span>
                    </el-form-item>

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
                appointments: [{
                    appointmentCode: '',
                }],
                activeNames: [0],
            }
        },

        created: function () {
            this.getAppointment();
        },

        methods: {
            getAppointment() {
                this.$http.get('/gl2/api/appointmentHistory/query', {
                    emulateJson: true,
                    params: util.parseQueryString(location.search)
                }).then((_ret) => {
                    if (_ret.body.code === 200) {
                        if (!!_ret.body.result.length) {
                            this.appointments = _ret.body.result
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
                    .m-appointment {
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