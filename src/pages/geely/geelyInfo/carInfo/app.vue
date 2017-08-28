<template>
	<div id="app"  class="g-main">
		<el-collapse accordion>
		  	<el-collapse-item title="浙AG1234" name="1">
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
const util = require('../../../../util.js')
const moment = require('moment')
export default {
	data() {
		return {
			carData: {

			},
			
		}
	},
	created: function() {
		this.init();
		this.getCarInfo();	
		},
	methods: {
		init() {
			var urlObj = util.parseQueryString(location.search);
		},
		getCarInfo() {
			var _$$this = this;
			var filter = {
				phone: '13898701001'
			};
			_$$this.$http.get('/gl2/api/vehicle/query', {
				emulateJson: true,
				params: filter
			}).then((_ret) => {
				if(_ret.body.code == 200){
					_.merge(_$$this.$data.carData,_ret.body.result, true);
					this.$forceUpdate();
					// alert(_$$this.$data.carData.fullName)

				}else{
					_$$this.$message.error(_ret.body.message);
				}
			}).catch((_ret) => {
				_$$this.$message.error('服务器出错了');
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
				.m-car{
					.el-form-item{
						margin-bottom: 0;
						label{
							width:85px;
						}
					}	
				}
			}
		}
	}
}
</style>