<template>
    <div id="app" class="g-main">
        <el-form ref="form" label-width="80px">
            <el-form-item label="姓名">
                <el-input v-model="userData.fullName"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="userData.genderCode" placeholder="请选择性别" style="width: 100%">
                    <el-option v-for="item in genders" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机号码1">
                <el-input v-model="userData.telephone1"></el-input>
            </el-form-item>
            <el-form-item label="手机号码2">
                <el-input v-model="userData.telephone2"></el-input>
            </el-form-item>
            <el-form-item label="手机号码3">
                <el-input v-model="userData.telephone3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="userData.emailAddress1"></el-input>
            </el-form-item>
            <el-form-item label="区域">
                <el-cascader
                        style="width: 100%"
                        :options="options"
                        :clearable="true"
                        @active-item-change="handleItemChange"
                        v-model="selectArea"
                        :props="props"
                ></el-cascader>
            </el-form-item>
            <el-form-item label="联络地址">
                <el-input type="textarea" v-model="userData.address"></el-input>
            </el-form-item>
            <el-form-item label="证件号码">
                <span>{{ userData.governmentId }}</span>
            </el-form-item>
            <el-form-item label="接入渠道">
                <span> {{ userData.leadSourceCode | channel }}</span>
            </el-form-item>
            <el-form-item label="数据来源">
                <span> {{ userData.dataFrom | source }}</span>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" v-model="userData.description"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" size="large" style="width: 180px;">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import util from '../../../../util.js';
    export default {
        data() {
            return {
                userData: {
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
                },
                selectArea: [],
                genders: [
                    {label: '先生', value: 1},
                    {label: '女士', value: 2},
                ],
                options: [],
                props: {
                    label: 'name',
                    value: 'id',
                    children: 'children'
                }
            }
        },

        created: function () {
            this.getUserInfo(); //初始化
            this.getProvince(); //获取省份
        },

        methods: {
            /**
             * 获取省份
             */
            getProvince() {
                this.$http.get('/gl2/api/sys/map/provinces').then((res) => {
                    if (res.body.code === 200) {
                        res.body.result && res.body.result.forEach((province) => {
                            province.children = [];
                            this.options.push(province);
                        })
                    }
                });
            },

            /**
             * 处理级联
             * @param _obj
             */
            handleItemChange(_obj) {
                switch (_obj.length) {
                    case 1:
                        const province = _obj[0];
                        this.$http.get('/gl2/api/sys/map/city', {
                            params: {id: province}
                        }).then((res) => {
                            if (res.body.code === 200) {
                                this.options.forEach((x) => {
                                    //找到对应省份
                                    if (x.id === province) {
                                        //没有加载过
                                        if (x.children && !x.children.length) {
                                            res.body.result.forEach((city) => {
                                                city.children = [];
                                                x.children.push(city);
                                            })
                                        }
                                    }
                                });
                            }
                        });
                        break;
                    case 2:
                        this.$http.get('/gl2/api/sys/map/area', {
                            params: {id: _obj[1]}
                        }).then((res) => {
                            if (res.body.code === 200) {
                                this.options.forEach((x, index) => {
                                    //找到对应的省份
                                    if (x.id === _obj[0]) {
                                        this.options[index].children.forEach((city, index2) => {
                                            //找到对应的市区
                                            if (city.id === _obj[1]) {
                                                //填进对应的区域
                                                this.options[index]['children'][index2]['children'] = res.body.result;
                                            }
                                        });
                                    }
                                });
                            }
                        });
                        break;
                    default:
                        break;
                }
            },

            /**
             * 获取初始信息
             */
            getUserInfo() {
                this.$http.get('/gl2/api/contact/query', {
                    emulateJson: true,
                    params: util.parseQueryString(location.search)
                }).then((_ret) => {
                    if (_ret.body.code === 200) {
                        this.userData = _ret.body.result;
                    } else {
                        this.$message.error(_ret.body.message);
                    }
                }).catch(() => {
                    this.$message.error('服务器出错了');
                })
            },

            /**
             * 提交
             */
            onSubmit() {
                console.log('submit')
            }
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

<style>
</style>