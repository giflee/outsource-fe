<template>
	<div id="app"  class="g-main">
		<el-collapse v-for="(driveData, index) in driveDatas"  v-model="activeNames" accordion>
		  	<el-collapse-item title="试驾" name="1">
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
							<span>{{ driveData.startTime }}</span>
						</template>
					</el-form-item>
					<el-form-item label="试驾结束时间">
						<template>
							<span>{{ driveData.finishTime }}</span>
						</template>
					</el-form-item>
					<el-form-item label="预约开始时间">
						<template>
							<span>{{ driveData.appointedStartTime }}</span>
						</template>
					</el-form-item>
					<el-form-item label="预约结束时间">
						<template>
							<span>{{ driveData.appointedFinishTime }}</span>
						</template>
					</el-form-item>
					<el-form-item label="试驾状态">
						<template>
							<span>{{ driveData.status }}</span>
						</template>
					</el-form-item>
					<el-form-item label="创建时间">
						<template>
							<span>{{ driveData.createdOn}}</span>
						</template>
					</el-form-item>
					<el-form-item label="更新时间">
						<template>
							<span>{{ driveData.modifiedOn}}</span>
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
const util = require('../../../../util.js')
const moment = require('moment')
export default {
	data() {
		return {
			driveDatas: [{
				dealerCode: ''
			}],
			activeNames:['1'],
			mobile:''
		}
	},
	created: function() {
			this.init();
			this.getDriveInfo();
		},
	methods: {
		init() {
				var urlObj = util.parseQueryString(location.search);
				this.$data.mobile = urlObj.mobile;
		},
		getDriveInfo() {
			var _$$this = this;
			var filter = {
				phone: this.$data.mobile
			};
			_$$this.$http.get('/gl2/api/ceDriveRecord/query', {
				emulateJson: true,
				params: filter
			}).then((_ret) => {
				if(_ret.body.code == 200){
					_.merge(_$$this.$data.driveDatas,_ret.body.result, true);
				}else{
					_$$this.$message.error(_ret.body.message);
				}
			}).catch((_ret) => {
				_$$this.$message.error('服务器出错了');
			})
		},
		
		
	},
	filters: {
		
	}
}
</script>

<style  lang="sass">
.g-main{
	.el-collapse{
		.el-collapse-item{
			.el-collapse-item__wrap{
				.m-driverecord{
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