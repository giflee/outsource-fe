<template>
    <div id="app" class="g-main">
        <el-collapse v-for="(vehro, index) in vehros" v-model="activeNames" accordion>
            <el-collapse-item :title="'销售记录-'+(index+1)" :name="index">
                <el-form class="m-vehro">
                    <el-form-item label="银行及金融公司">
                        <span>{{vehro.bankid}}</span>
                    </el-form-item>
                    <el-form-item label="开票日期">
                        <span>{{vehro.issueDate | dateFilter}}</span>
                    </el-form-item>
                    <el-form-item label="经销商">
                        <span>{{vehro.dealerId }}</span>
                    </el-form-item>
                    <el-form-item label="定金">
                        <span>{{vehro.earnest }}</span>
                    </el-form-item>
                    <el-form-item label="总额">
                        <span>{{vehro.totalamount }}</span>
                    </el-form-item>
                    <el-form-item label="订单日期">
                        <span>{{vehro.orderdate | dateFilter}}</span>
                    </el-form-item>
                    <el-form-item label="状态">
                        <span>{{vehro.status }}</span>
                    </el-form-item>
                    <el-form-item label="价格">
                        <span>{{vehro.price }}</span>
                    </el-form-item>
                    <el-form-item label="删除标志">
                        <span>{{vehro.isDeleted }}</span>
                    </el-form-item>
                    <el-form-item label="排序">
                        <span>{{vehro.sequence }}</span>
                    </el-form-item>
                    <el-form-item label="备注">
                        <span>{{vehro.remark }}</span>
                    </el-form-item>
                    <el-form-item label="创建人">
                        <span>{{vehro.createdBy }}</span>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <span>{{vehro.createdOn | dateFilter}}</span>
                    </el-form-item>
                    <el-form-item label="修改人">
                        <span>{{vehro.modifiedBy}}</span>
                    </el-form-item>
                    <el-form-item label="修改时间">
                        <span>{{vehro.modifiedOn | dateFilter }}</span>
                    </el-form-item>
                    <el-form-item label="客户">
                        <span>{{vehro.customer }}</span>
                    </el-form-item>
                    <el-form-item label="车主">
                        <span>{{vehro.contactid }}</span>
                    </el-form-item>
                    <el-form-item label="零售订单来源">
                        <span>{{vehro.retailordertype }}</span>
                    </el-form-item>
                    <el-form-item label="标准价格">
                        <span>{{vehro.stdprice }}</span>
                    </el-form-item>
                    <el-form-item label="交定金时间">
                        <span>{{vehro.paydeposit_time | dateFilter }}</span>
                    </el-form-item>
                    <el-form-item label="保险公司">
                        <span>{{vehro.insurancecompanyid }}</span>
                    </el-form-item>
                    <el-form-item label="开票名称">
                        <span>{{vehro.invoiceName }}</span>
                    </el-form-item>
                    <el-form-item label="销售顾问">
                        <span>{{vehro.ownerid }}</span>
                    </el-form-item>
                    <el-form-item label="零售锁车匹配类型">
                        <span>{{vehro.retaillocktype }}</span>
                    </el-form-item>
                    <el-form-item label="商城创建时间">
                        <span>{{vehro.createdonmall | dateFilter }}</span>
                    </el-form-item>
                    <el-form-item label="创建人名称">
                        <span>{{vehro.createdbymall }}</span>
                    </el-form-item>
                    <el-form-item label="数据来源平台">
                        <span>{{vehro.dataplatform }}</span>
                    </el-form-item>
                    <el-form-item label="批售订单">
                        <span>{{vehro.wsorderId }}</span>
                    </el-form-item>
                    <el-form-item label="预计交期（天）">
                        <span>{{vehro.deliverytime }}</span>
                    </el-form-item>
                    <el-form-item label="预计交期（周）">
                        <span>{{vehro.deliveryweek }}</span>
                    </el-form-item>
                    <el-form-item label="零售订单编号">
                        <span>{{vehro.name }}</span>
                    </el-form-item>
                    <el-form-item label="唯一排队号">
                        <span>{{vehro.lineid }}</span>
                    </el-form-item>
                    <el-form-item label="货币类型">
                        <span>{{vehro.transactioncurrencyid }}</span>
                    </el-form-item>
                    <el-form-item label="订单状态">
                        <span>{{vehro.orderstatus }}</span>
                    </el-form-item>
                    <el-form-item label="Vin">
                        <span>{{vehro.vin }}</span>
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
                vehros: [{
                    bankid: '',
                }],
                activeNames: [0],
            }
        },

        created: function () {
            this.getVehro();
        },

        methods: {
            getVehro() {
                this.$http.get('/gl2/api/vehro/query', {
                    emulateJson: true,
                    params: util.parseQueryString(location.search)
                }).then((_ret) => {
                    if (_ret.body.code === 200) {
                        if (!!_ret.body.result && _ret.body.result.length) {
                            this.vehros = _ret.body.result
                        }
                    } else {
                        !!_ret.body.message && this.$message.error(_ret.body.message);
                    }
                }).catch(() => {
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
                    .m-vehro {
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