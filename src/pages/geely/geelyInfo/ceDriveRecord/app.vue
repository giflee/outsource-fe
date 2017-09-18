<template>
    <div id="app" class="g-main">
        <el-collapse v-for="(driveData, index) in driveDatas" v-model="activeNames" accordion>
            <el-collapse-item :title="'试驾记录-'+index" :name="index">
                <el-form class="m-driverecord">
                    <el-form-item label="经销商编码">
                        <template>
                            <span>{{ driveData.dealerCode }}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="账户id">
                        <template>
                            <span>{{ driveData.accountId }}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="客户手机号码">
                        <template>
                            <span>{{ driveData.phone }}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="销售顾问id">
                        <template>
                            <span>{{ driveData.salesId }}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="试驾开始时间">
                        <template>
                            <span>{{ driveData.sartTime | dateFilter}}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="试驾结束时间">
                        <template>
                            <span>{{ driveData.finishTtime | dateFilter}}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="预约开始时间">
                        <template>
                            <span>{{ driveData.appointedStartTime | dateFilter }}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="预约结束时间">
                        <template>
                            <span>{{ driveData.appointedFinishTime | dateFilter }}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="试驾状态">
                        <template>
                            <span>{{ driveData.status }}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <template>
                            <span>{{ driveData.createdOn | dateFilter}}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="更新时间">
                        <template>
                            <span>{{ driveData.modifiedOn | dateFilter}}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="试驾车系">
                        <template>
                            <span>{{ driveData.vehicleClass}}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="试驾车型">
                        <template>
                            <span>{{ driveData.vehiclestyleId }}</span>
                        </template>
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
                driveDatas: [{
                    dealerCode: '',
                    accountId: '',
                    phone: '',
                    salesId: '',
                    sartTime: '',
                    finishTtime: '',
                    appointedStartTime: '',
                    appointedFinishTime: '',
                    status: '',
                    createdOn: '',
                    modifiedOn: '',
                    vehicleClass: '',
                    vehiclestyleId: ''
                }],
                activeNames: [0],
            }
        },

        created: function () {
            this.getDriveInfo();
        },

        methods: {
            getDriveInfo() {
                this.$http.get('/gl2/api/ceDriveRecord/query', {
                    emulateJson: true,
                    params: util.parseQueryString(location.search)
                }).then((_ret) => {
                    if (_ret.body.code === 200) {
                        if (!!_ret.body.result && _ret.body.result.length) {
                            this.driveDatas = _ret.body.result;
                        }
                    } else {
                        !!_ret.body.message && this.$message.error(_ret.body.message);
                    }
                }).catch((_ret) => {
                    this.$message.error('服务器出错了');
                })
            }
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
                    .m-driverecord {
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