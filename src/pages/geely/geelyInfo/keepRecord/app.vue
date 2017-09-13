<template>
    <div id="app" class="g-main">
        <el-collapse v-for="(keep,index) in keeps" v-model="activeNames" accordion>
            <el-collapse-item :title="'维修记录-'+keep.serviceProxyCode" :name="index">
                <el-form class="m-keep">
                    <el-form-item label="维修委托书编号">
                        <span>{{keep.serviceProxyCode}}</span>
                    </el-form-item>
                    <el-form-item label="当前表类型">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="服务经销商">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="维修经销商名称">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="服务顾问名">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="客户到店时间">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="客户要求">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="里程数">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="预计交车时间">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="计划开始维修时间">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="实际开始维修时间">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="完工时间">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="是否提交">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="是否维修履历">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="追加审核状态">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="追加描述">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="预警等级">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="提车证明">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="中断类型">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="机修钣喷操作状态">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="机修部分">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="钣喷状态">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="保修状态">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="状态">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="删除标志">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="备注">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="创建人">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="修改人">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="修改时间">
                        <span>{{keep.keepAt}}</span>
                    </el-form-item>
                    <el-form-item label="维修委托书工单类型">
                        <span>{{keep.keepAt}}</span>
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