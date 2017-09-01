<template>
	<div id="app"  class="g-main">
	<el-collapse v-for="(worksheet, index) in worksheets"  v-model="activeNames" accordion>
		  	<el-collapse-item title="案例" :name="index">
			    <el-form class="m-worksheet">
					<el-form-item label="实际解决时间">
						<template scope="scope">
							<span>{{worksheet.actualsolveTime}}</span>
						</template>
					</el-form-item>
					<el-form-item label="问题分类1">
						<template>
							<span>{{worksheet.caseLevel1}}</span>
						</template>
					</el-form-item>
					<el-form-item label="渠道">
						<template>
							<span>{{worksheet.channel}}</span>
						</template>
					</el-form-item>
					<el-form-item label="关单时间">
						<template>
							<span>{{worksheet.closeTime}}</span>
						</template>
					</el-form-item>
					<el-form-item label="投诉发送时间">
						<template>
							<span>{{worksheet.complaintsSendTime}}</span>
						</template>
					</el-form-item>
					<el-form-item label="来电">
						<template>
							<span>{{worksheet.contactTel}}</span>
						</template>
					</el-form-item>
					<el-form-item label="经销商">
						<template>
							<span>{{worksheet.dealer}}</span>
						</template>
					</el-form-item>
					<el-form-item label="经销商反馈">
						<template>
							<span>{{worksheet.dealerFeedBack}}</span>
						</template>
					</el-form-item>
					<el-form-item label="预计解决时间">
						<template>
							<span>{{worksheet.expectSolveTime}}</span>
						</template>
					</el-form-item>
					<el-form-item label="客户ID">
						<template>
							<span>{{worksheet.customerId}}</span>
						</template>
					</el-form-item>
					<el-form-item label="客户">
						<template>
							<span>{{worksheet.fullname}}</span>
						</template>
					</el-form-item>
					<el-form-item label="是否有购买意向">
						<template>
							<span>{{worksheet.isbuyintention}}</span>
						</template>
					</el-form-item>
					<el-form-item label="是否需要回访">
						<template>
							<span>{{worksheet.isNeedVisit}}</span>
						</template>
					</el-form-item>
					<el-form-item label="升级交互备注">
						<template>
							<span>{{worksheet.pgradeInterActiveRemarks}}</span>
						</template>
					</el-form-item>
					<el-form-item label="问题描述">
						<template>
							<span>{{worksheet.problemDescription}}</span>
						</template>
					</el-form-item>
					<el-form-item label="解决方案">
						<template>
							<span>{{worksheet.solution}}</span>
						</template>
					</el-form-item>
					<el-form-item label="升级时间">
						<template>
							<span>{{worksheet.upgraDetime}}</span>
						</template>
					</el-form-item>
					<el-form-item label="车系">
						<template>
							<span>{{worksheet.vehicleClass}}</span>
						</template>
					</el-form-item>
					
					<el-form-item label="回访人">
						<template>
							<span>{{worksheet.visitBy}}</span>
						</template>
					</el-form-item>
					<el-form-item label="回访时间">
						<template>
							<span>{{worksheet.visitOn}}</span>
						</template>
					</el-form-item>
					<el-form-item label="回访内容">
						<template>
							<span>{{worksheet.visitContent}}</span>
						</template>
					</el-form-item>
					<el-form-item label="回访状态">
						<template>
							<span>{{worksheet.visitStatus}}</span>
						</template>
					</el-form-item>
					<el-form-item label="状态">
						<template>
							<span>{{worksheet.status}}</span>
						</template>
					</el-form-item>
					<el-form-item label="备注">
						<template>
							<span>{{worksheet.commons}}</span>
						</template>
					</el-form-item>
					<el-form-item label="创建人">
						<template>
							<span>{{worksheet.createdBy}}</span>
						</template>
					</el-form-item>
					<el-form-item label="修改人">
						<template>
							<span>{{worksheet.modifiedBy}}</span>
						</template>
					</el-form-item>
					<el-form-item label="创建时间">
						<template>
							<span>{{worksheet.createdOn}}</span>
						</template>
					</el-form-item>
					<el-form-item label="修改时间">
						<template>
							<span>{{worksheet.modifiedOn}}</span>
						</template>
					</el-form-item>
					<el-form-item label="案例来源">
						<template scope="scope">
							<span>{{worksheet.caseOriginCode}}</span>
						</template>
					</el-form-item>
					<el-form-item label="工单状态">
						<template>
							<span>{{worksheet.incidentStatus}}</span>
						</template>
					</el-form-item>
					<el-form-item label="严重程度">
						<template>
							<span>{{worksheet.severityCode}}</span>
						</template>
					</el-form-item>
			    </el-form>
		  	</el-collapse-item>
	  	</el-collapse>
	</div>
</template>
<script>
const util = require('../../../../util.js')
const moment = require('moment')
export default {
	data() {
		return {
			worksheets: [{
				actualsolveTime: ''
			}],
			activeNames:['0'],
			mobile:''
		}
	},
	created: function(){
		this.init();
		this.getWorksheet();
	},
	methods: {
		init(){
			var urlObj = util.parseQueryString(location.search);
			this.$data.mobile = urlObj.mobile;
		},
		getWorksheet(){
			var filter = {
				phone: this.$data.mobile || '18806270001'
			};
			this.$http.get('/gl2/api/crIncident/query', {
				emulateJson: true,
				params: filter
			}).then((_ret) => {
				if(_ret.body.code == 200){
					_.merge(this.$data.worksheets, _ret.body.result, true);
					this.$forceUpdate();
				}else{
					this.$message.error(_ret.body.message);
				}
			}).catch((_ret) => {
				this.$message.error('服务器出错了');
			})
		},
	}


}


</script>
<style  lang="sass">
.g-main{
	.el-collapse{
		.el-collapse-item{
			.el-collapse-item__wrap{
				.m-worksheet{
					.el-form-item{
						margin-bottom: 0;
						label{
							width:110px;
						}
					}	
				}
			}
		}
	}
}
</style>