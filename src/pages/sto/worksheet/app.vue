<template>
    <div id="app">
        <div class="nav clearfix">
            <button class="u-btn" :class="{ active: activeTab === 'add' }" @click="activeTab = 'add'">
                新建工单
            </button>
            <button class="u-btn" :class="{ active: activeTab === 'search' }" @click="activeTab ='search'">
                工单搜索
            </button>
        </div>

        <div v-show="activeTab === 'add'">
            <el-form label-position="left" label-width="100px" :model="form" style="padding:0 30px" :rules="rules"
                     ref="ruleForm">
                <div class="title clearfix">
                    <h3>工单信息</h3>
                    <span>标<span class="star">&nbsp;*&nbsp;</span>为必填项</span>
                </div>
                <el-form-item label="创建人" prop="creator">
                    <el-input v-model="form.creator" placeholder="请输入创建人" :maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="快递单号" prop="express">
                    <el-input v-model="form.express" placeholder="请输入快递单号" :maxlength="13"></el-input>
                </el-form-item>
                <el-form-item label="发起方" prop="initiate">
                    <el-select v-model="form.initiate" placeholder="请输入发起方">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发起方电话" prop="initiatePhone">
                    <el-input v-model="form.initiatePhone" placeholder="请输入发起方电话" :maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="发起方姓名" prop="initiateName">
                    <el-input v-model="form.initiateName" placeholder="请输入发起方姓名" :maxlength="4"></el-input>
                </el-form-item>

                <div class="title clearfix">
                    <h3>用户信息</h3>
                </div>

                <el-form-item label="收件人姓名" prop="receiveName">
                    <el-input v-model="form.receiveName" placeholder="请输入收件人姓名" :maxlength="4"></el-input>
                </el-form-item>
                <el-form-item label="收件人电话" prop="receivePhone">
                    <el-input v-model="form.receivePhone" placeholder="请输入收件人电话" :maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="收件人地址" prop="receiveAddress">
                    <el-input v-model="form.receiveAddress" type="textarea" resize="none" :maxlength="100"
                              :autosize="{ minRows: 4}"
                              placeholder="请输入收件人地址"></el-input>
                </el-form-item>

                <div class="line"></div>

                <el-form-item label="发件人姓名" prop="sendName">
                    <el-input v-model="form.sendName" placeholder="请输入发件人姓名" :maxlength="4"></el-input>
                </el-form-item>
                <el-form-item label="发件人电话" prop="sendPhone">
                    <el-input v-model="form.sendPhone" placeholder="请输入发件人电话" :maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="发件人地址" prop="sendAddress">
                    <el-input v-model="form.sendAddress" type="textarea" resize="none" :maxlength="100"
                              :autosize="{ minRows: 4}"
                              placeholder="请输入发件人地址"></el-input>
                </el-form-item>

                <div class="title clearfix">
                    <h3>问题信息</h3>
                </div>

                <el-form-item label="问题类型" prop="questionType">
                    <el-cascader
                            :options="cascaderOptions"
                            v-model="form.questionType"
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="问题描述" prop="questionDescribe">
                    <el-input v-model="form.questionDescribe" placeholder="请输入问题描述" :maxlength="500"
                              :autosize="{ minRows: 4}" type="textarea" resize="none"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="note">
                    <el-input v-model="form.note" type="textarea" resize="none" placeholder="请输入问题备注"
                              :autosize="{ minRows: 4}"
                              :maxlength="500"></el-input>
                </el-form-item>
                <!--<el-form-item label="上传附件">-->
                <!--<el-upload-->
                <!--drag-->
                <!--ref="upload"-->
                <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                <!--accept=".jpg,.jpeg,.bmp,.gif,.rar,.zip"-->
                <!--:before-upload="beforeAvatarUpload"-->
                <!--:on-success="handleFileChange"-->
                <!--:on-remove="handleFileRemove"-->
                <!--:file-list="form.fileList">-->
                <!--<i class="el-icon-upload"></i>-->
                <!--<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
                <!--<div class="el-upload__tip" slot="tip">上传jpg、png、bmp、gif、rar、zip格式文件最多5个，单个最大500K</div>-->
                <!--</el-upload>-->
                <!--</el-form-item>-->
                <div class="btn-group">
                    <el-form-item>
                        <el-button type="primary" class="btn-submit" @click="submitForm('ruleForm')">提交
                        </el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>

        <div v-show="activeTab === 'search'">
            <div style="padding: 0 20px">
                <div style="text-align: center">
                    <el-input placeholder="请输入内容" v-model="searchInput" class="searchType">
                        <el-select v-model="searchType" slot="prepend" placeholder="请选择">
                            <el-option label="快递单号" value="0"></el-option>
                            <el-option label="电话号码" value="1"></el-option>
                        </el-select>
                    </el-input>
                    <el-button type="primary" class="btn-search" @click="getSearchList(!0)">搜索</el-button>
                    <span class="u-total">共{{total}}条工单</span>
                </div>
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%;margin-top: 20px">
                    <el-table-column
                            prop="express"
                            width="120"
                            label="快递单号">
                        <template scope="scope">
                            <span v-if="searchType === '0'" v-html="highLightWord(scope.row.express)"></span>
                            <span v-else>{{scope.row.express}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            width="110"
                            label="电话">
                        <template scope="scope">
                            <span v-if="searchType === '1'" v-html="highLightWord(scope.row.phone)"></span>
                            <span v-else>{{scope.row.phone}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            width="80"
                            label="处理状态">
                    </el-table-column>
                    <el-table-column
                            prop="person"
                            width="80"
                            label="处理人员">
                    </el-table-column>
                    <el-table-column
                            prop="result"
                            label="处理结果">
                    </el-table-column>
                </el-table>
                <el-pagination
                        :page-size="limit"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        layout="prev, pager, next"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeTab: 'add', //当前激活Tab
                form: {
                    creator: '',
                    express: '',
                    initiate: 0,
                    initiatePhone: '',
                    initiateName: '',
                    receiveName: '',
                    receivePhone: '',
                    receiveAddress: '',
                    sendName: '',
                    sendPhone: '',
                    sendAddress: '',
                    questionType: [],
                    questionDescribe: '',
                    note: '',
//                    fileList: [],
                }, //表单数据项
                rules: {
                    creator: [
                        {required: true, message: '请输入创建人', trigger: 'blur'},
                        {min: 1, max: 10, message: '超过限制输入', trigger: 'blur'}
                    ],
                    express: [
                        {required: true, message: '请输入快递单号', trigger: 'blur'},
                        {min: 1, max: 13, message: '请输入正确的快递单号', trigger: 'blur'}
                    ],
                    initiate: [
                        {type: 'number', required: true, message: '请选择工单发起方', trigger: 'change'}
                    ],
                    initiatePhone: [
                        {required: true, message: '请输入发起方电话', trigger: 'blur'},
                        {min: 1, max: 11, message: '超过限制输入', trigger: 'blur'}
                    ],
                    initiateName: [
                        {required: true, message: '请输入发起方姓名', trigger: 'blur'},
                        {min: 1, max: 4, message: '超过限制输入', trigger: 'blur'}
                    ],
                    receiveName: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 1, max: 4, message: '超过限制输入', trigger: 'blur'}
                    ],
                    receivePhone: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 1, max: 11, message: '超过限制输入', trigger: 'blur'}
                    ],
                    receiveAddress: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 1, max: 100, message: '地址不得超过100个字', trigger: 'blur'}
                    ],
                    sendName: [
                        {min: 0, max: 4, message: '超过限制输入', trigger: 'blur'}
                    ],
                    sendPhone: [
                        {min: 0, max: 11, message: '超过限制输入', trigger: 'blur'}
                    ],
                    sendAddress: [
                        {min: 0, max: 100, message: '地址不得超过100个字', trigger: 'blur'}
                    ],
                    questionType: [
                        {type: 'array', required: true, message: '请选择问题类型', trigger: 'change'},
                    ],
                    questionDescribe: [
                        {required: true, message: '请输入问题描述', trigger: 'blur'},
                        {min: 1, max: 500, message: '问题描述不得超过500个字', trigger: 'blur'}
                    ],
                    note: [
                        {min: 0, max: 500, message: '备注不得超过500个字', trigger: 'blur'}
                    ],
                }, //表单验证规则
                options: [
                    {value: 0, label: '发件人'},
                    {value: 1, label: '收件人'},
                    {value: 2, label: '第三方'},
                ], //发起方选项
                cascaderOptions: [], //问题类型选项（级联）
                searchInput: '', //工单筛选值
                searchType: '0', //工单筛选项  0-快递单号 1-电话号码
                total: 0, //筛选列表项总数
                currentPage: 1, //当前页
                limit: 50, //一页数据量
                tableData: [], //筛选数据列表
            }
        },

        created: function () {
            this.$http.get('/sto/api/questionType').then((res) => {
                if (res.body.code === 200) {
                    this.cascaderOptions = res.body.result;
                } else {
                    this.$message({
                        showClose: true,
                        message: res.body.message || '获取问题类型失败',
                        type: 'error'
                    })
                }
            }).catch((err) => {
                this.$message({
                    showClose: true,
                    message: err.body.message || '获取问题类型失败',
                    type: 'error'
                })
            })
        },

        methods: {
            /**
             * 新建工单表单重置
             */
            resetForm() {
                const restForm = {
                    creator: '',
                    express: '',
                    initiate: 0,
                    initiatePhone: '',
                    initiateName: '',
                    receiveName: '',
                    receivePhone: '',
                    receiveAddress: '',
                    sendName: '',
                    sendPhone: '',
                    sendAddress: '',
                    questionType: [],
                    questionDescribe: '',
                    note: '',
                    fileList: [],
                };

                //reset
                this.form = JSON.parse(JSON.stringify(restForm));
                this.$refs.ruleForm.resetFields();
//                this.$refs.upload.clearFiles();
            },

//            /**
//             * 上传前检查
//             */
//            beforeAvatarUpload(file) {
//                const isLt5 = file.size / 1024 / 1024 < 0.5;
//                const suffix = file.name && file.name.split(".").pop();
//                const arr = ['jpg', 'png', 'bmp', 'gif', 'rar', 'zip'];
//
//                const acceptLimit = this.form.fileList.length > 5;
//
//                const cantAccept = arr.every((x) => {
//                    return x !== suffix;
//                });
//
//                if (cantAccept) {
//                    this.$message.error('仅能上传jpg、png、bmp、gif、rar、zip格式文件');
//                    return false;
//                }
//
//                if (!isLt5) {
//                    this.$message.error('单个文件最大500K');
//                    return false;
//                }
//
//                if (acceptLimit) {
//                    this.$message.error('最多上传五个文件');
//                    return false;
//                }
//
//                return !cantAccept && isLt5 && !acceptLimit;
//            },
//
//            /**
//             * 文件上传成功
//             */
//            handleFileChange(file, list) {
//                console.log(file, list);
////                this.form.fileList.push({});
//            },
//
//            /**
//             * 文件删除
//             */
//            handleFileRemove(file, list) {
//                console.log(file, list)
//            },

            /**
             * 页码改变
             */
            handleCurrentChange(crPage) {
                this.currentPage = crPage;
                this.getSearchList();
            },

            /**
             * 工单搜索
             */
            getSearchList(reset) {
                if (reset) {
                    this.currentPage = 1;
                }
                this.$http.post('/sto/api/searchWorksheet', {
                    limit: this.limit,
                    offset: (this.currentPage - 1) * this.limit,
                    searchInput: this.searchInput,
                    searchType: this.searchType
                }).then((res) => {
                    if (res.body.code === 200) {
                        this.tableData = res.body.result;
                        this.total = res.body.total;
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.body.message || '未知错误',
                            type: 'error'
                        })
                    }
                }).catch((_err) => {
                    this.$message({
                        showClose: true,
                        message: _err.body.message || '未知错误',
                        type: 'error'
                    })
                })
            },

            /**
             * 转义
             * @param s
             * @returns {string|*|void|XML}
             */
            regTrim(s) {
                const imp = /[\^\.\\\|\(\)\*\+\-\$\[\]\?]/g;
                const imp_c = {};
                imp_c["^"] = "\\^";
                imp_c["."] = "\\.";
                imp_c["\\"] = "\\\\";
                imp_c["|"] = "\\|";
                imp_c["("] = "\\(";
                imp_c[")"] = "\\)";
                imp_c["*"] = "\\*";
                imp_c["+"] = "\\+";
                imp_c["-"] = "\\-";
                imp_c["$"] = "\$";
                imp_c["["] = "\\[";
                imp_c["]"] = "\\]";
                imp_c["?"] = "\\?";
                s = s.replace(imp, function (o) {
                    return imp_c[o];
                });
                return s;
            },

            /**
             * 语法高亮
             * @param word
             * @returns {*}
             */
            highLightWord: function (word) {
                if (!this.searchInput) return word;
                const keyword = this.regTrim(this.searchInput);
                const hlValue = new RegExp("(" + keyword + ")", "gi");
                return word.replace(hlValue, "<span style='color:red'>$1</span>");
            },

            /**
             * 提交表单
             * @param formName
             */
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post('/sto/api/worksheet', this.form).then((res) => {
                            if (res.body.code === 200) {
                                this.resetForm();
                                this.$message('提交成功')
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: res.body.message || '未知错误',
                                    type: 'error'
                                })
                            }
                        }).catch((_err) => {
                            this.$message({
                                showClose: true,
                                message: _err.body.message || '未知错误',
                                type: 'error'
                            })
                        })
                    }
                });
            },
        }

    }
</script>

<style lang="scss">
    body, html {
        margin: 0;
        padding: 0;
        /*min-width: 518px;*/
        font-family: MicrosoftYaHei;
    }

    .el-select, .el-cascader {
        width: 100%;
    }

    .el-table {
        font-size: 12px;
        thead {
            tr th {
                text-align: center;
            }
        }
    }

    .el-pagination {
        text-align: center;
        margin-top: 30px;
    }

    .el-table .cell, .el-table th > div {
        padding: 10px;
    }

    .searchType {
        width: 60%;
        .el-input-group__prepend, .el-input__inner {
            border-radius: 2px;
        }
        .el-input__icon + .el-input__inner {
            padding-right: 0;
        }
        .el-select {
            .el-input {
                width: 94px;
            }
        }
    }

    .el-form-item.is-required .el-form-item__label:before {
        color: #5092E1;
    }

    .el-upload, .el-upload-dragger {
        width: 100%;
    }

    .el-pager li.active {
        background: #5092E1;
    }

    .u-total {
        font-size: 12px;
        color: #666666;
    }

    .btn-search {
        background: #5092E1;
        border-radius: 2px;
        width: 60px;
        margin-left: 5px;
        margin-right: 20px;
    }

    .btn-submit {
        background: #5092E1;
        border-radius: 2px;
        width: 68px
    }

    .clearfix:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden
    }

    div.line {
        width: 100%;
        background: #F2F2F2;
        height: 1px;
        margin: 20px auto;
    }

    .title {
        h3 {
            font-size: 16px;
            color: #222222;
            margin-top: 0;
            margin-bottom: 20px;
            float: left;
        }
        > span {
            float: right;
        }
        span {
            font-size: 12px;
            color: #666666;
            letter-spacing: 0;
            &.star {
                color: #5092E1;
            }
        }

    }

    .nav {
        margin: 23px 20px;
        text-align: center;
        .u-btn {
            outline: 0;
            width: 50%;
            cursor: pointer;
            box-sizing: border-box;
            line-height: 35px;
            font-size: 14px;
            color: #999;
            background: rgba(216, 216, 216, 0.00);
            border: 1px solid #CCCCCC;
            border-radius: 2px;
            display: inline-block;
            &:last-child {
                margin-left: -6px;
            }
            &.active {
                color: #fff;
                background: #5092E1;
                border-radius: 2px;
                border-color: #5092E1;
            }
        }
    }
</style>