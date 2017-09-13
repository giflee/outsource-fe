<template>
    <div id="app" class="g-main">
        <el-collapse v-for="(carData,index) in carDatas" v-model="activeNames" accordion>
            <el-collapse-item :title="carData.licenseno" :name="index">
                <el-form class="m-car">
                    <el-form-item label="VIN码">
                        <template>
                            <span>{{carData.vin}}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="车辆牌照">
                        <template>
                            <span>{{carData.licenseno}}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="车辆颜色">
                        <template>
                            <span>{{carData.vehicleColorId}}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="购车日期">
                        <template>
                            <span>{{carData.salesdate}}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="所属经销商">
                        <template>
                            <span>{{carData.fullName}}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="车型">
                        <template>
                            <span>{{carData.vehiclestyleId}}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="车系">
                        <template>
                            <span>{{carData.vehicleTypeId}}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="变速箱类型">
                        <template>
                            <span>{{carData.gearnumber}}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="底盘号">
                        <template>
                            <span>{{carData.chassismodel}}</span>
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
                carDatas: [{
                    vin: '',
                    licenseno: '',
                    vehicleColorId: '',
                    salesdate: '',
                    fullName: '',
                    vehiclestyleId: '',
                    vehicleTypeId: '',
                    gearnumber: '',
                    chassismodel: ''
                }],
                activeNames: [0],
            }
        },

        created: function () {
            this.getCarInfo();
        },

        methods: {
            getCarInfo() {
                this.$http.get('/gl2/api/vehicle/query', {
                    emulateJson: true,
                    params: util.parseQueryString(location.search)
                }).then((_ret) => {
                    if (_ret.body.code === 200) {
                        this.carDatas = _ret.body.result;
                    } else {
                        this.$message.error(_ret.body.message);
                    }
                }).catch((_ret) => {
                    this.$message.error('服务器出错了');
                })
            },
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
                    .m-car {
                        .el-form-item {
                            margin-bottom: 0;
                            label {
                                width: 85px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>