<template>
    <div id="app" class="g-main">
        <el-collapse v-for="(user,index) in userData" v-model="activeNames" accordion>
            <el-collapse-item :title="'姓名-'+(user.fullName||'')" :name="index">
                <el-form class="m-car">
                    <el-form-item label="姓名">
                        <template>
                            <span>{{user.fullName}}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="性别">
                        <template>
                            <span>{{user.genderCode}}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="联系号码1">
                        <template>
                            <span>{{user.telephone1}}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="联系号码2">
                        <template>
                            <span>{{user.telephone2}}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="联系号码3">
                        <template>
                            <span>{{user.telephone3}}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <template>
                            <span>{{user.emailAddress1}}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="省">
                        <template>
                            <span>{{user.province}}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="市">
                        <template>
                            <span>{{user.city}}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="区">
                        <template>
                            <span>{{user.district}}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="联络地址">
                        <template>
                            <span>{{user.address}}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="证件号码">
                        <template>
                            <span>{{user.id}}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="接入渠道">
                        <template>
                            <span>{{user.leadSourceCode}}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="数据来源">
                        <template>
                            <span>{{user.dataFrom}}</span>
                        </template>
                    </el-form-item>
                    <el-form-item label="备注">
                        <template>
                            <span>{{user.description}}</span>
                        </template>
                    </el-form-item>
                </el-form>
            </el-collapse-item>
        </el-collapse>

    </div>
</template>

<script>
    import util from '../../../../util.js';

    export default {
        data() {
            return {
                userData: [{
                    fullName: '',
                    genderCode: '',
                    telephone1: '',
                    telephone2: '',
                    telephone3: '',
                    emailAddress1: '',
                    address: '',
                    district: '',
                    governmentId: '',
                    leadSourceCode: '',
                    dataFrom: '',
                    description: '',
                }],
                activeNames: [0]
            }
        },

        created: function () {
            this.getUserInfo(); //初始化
        },

        methods: {
            getUserInfo() {
                this.$http.get('/gl2/api/contact/query', {
                    emulateJson: true,
                    params: util.parseQueryString(location.search)
                }).then((_ret) => {
                    if (_ret.body.code === 200) {
                        if (!!_ret.body.result && _ret.body.result.length) {
                            this.userData = _ret.body.result;
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
            channel: function (value) {
                const map = {
                    1: '电话',
                    2: '邮件',
                    3: '官网',
                    4: '在线',
                    5: '微博',
                    6: '微信',
                    7: '短信',
                    8: '电商',
                    9: '经销商',
                    10: '线上活动',
                    11: '线下活动',
                    12: '第三方合作',
                    13: '其他'
                };
                return map[value];
            },

            source: function (value) {
                const map = {
                    1: '官网',
                    2: 'APP',
                    3: '整车销售接口',
                    4: '呼叫中心',
                    5: '销售客户同步接口',
                    6: '微信',
                    7: '售后客户同步接口'
                };
                return map[value];
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