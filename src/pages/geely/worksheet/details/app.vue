<template>
<div id="app" class="g-main">
	<div class="m-status">
		<div class="m-circle">
         	<span class="m-number">1</span>
    	</div>
    	<div class="m-circle">
    		<span class="m-number">2</span>
    	</div>
    	<div class="m-circle">
    		<span class="m-number">3</span>
    	</div>
	</div>
	<hr>
	<div class="m-details">
		<el-form>
			<el-form-item label="工单编号">
				<template>
					<span>{{ worksheetno }}</span>
      			</template>
			</el-form-item>
			<el-form-item label="创建时间">
				<span>{{ createTime }}</span>
			</el-form-item>
			<el-form-item label="工单分类">
				<span>{{ worksheetType }}</span>
				</el-form-item>
			<el-form-item label="工单状态">
				<span>{{ worksheetStatus }}</span>
			</el-form-item>
			<el-form-item label="工单详情">
				<span>{{ worksheetDetails }}</span>
			</el-form-item>
			<el-form-item label="处理结果">
				<span>{{ worksheetResult }}</span>
			</el-form-item>
			<el-form-item label="用户信息" class="m-usermsg">
				<el-form class="f-usermsg">
					<el-form-item label="姓名" label-width="68px">
						<span>{{ userName }}</span>
					</el-form-item>
					<el-form-item label="手机号码" label-width="68px">
						<span>{{ userPhone }}</span>
					</el-form-item>
					<el-form-item label="邮箱" label-width="68px">
						<span>{{ userMail }}</span>
					</el-form-item>
				</el-form>
			</el-form-item>
		</el-form>
	</div>
	<hr>
	<div class="m-evaluate">
		<el-form>
			<el-form-item label="工单评价">
				<el-form class="f-evaluate">
					<el-form-item label="处理结果">
						<el-rate 
						v-mode="resValue" 
						:colors="['#99A9BF', '#F7BA2A', '#FF9900']">
						</el-rate>
					</el-form-item>
					<el-form-item label="处理时效">
						<el-rate 
						v-mode="effValue" 
						:colors="['#99A9BF', '#F7BA2A', '#FF9900']">
						</el-rate>
					</el-form-item>
					<el-form-item label="服务态度">
						<el-rate 
						v-mode="attValue" 
						:colors="['#99A9BF', '#F7BA2A', '#FF9900']">
						</el-rate>
					</el-form-item>
					<el-form-item>
						<el-input
						type="textarea"
						:autosize="{ minRows: 2, maxRows: 4}"
						placeholder="其他建议或意见"
						v-model="advValue">
						</el-input>
					</el-form-item>
					<el-row>
						<el-col :span="6">
							<el-button
							type="parmiary"
							size=""  @click="evaluate">
							提交评价
							</el-button>
						</el-col>
					</el-row>
				</el-form>
			</el-form-item>
		</el-form>
	</div>
</div>
</template>

<script>
	const util = require('../../../../util.js')
	export default {
		data() {
			return {
				worksheetno: '2718282374122',
				createTime: '123345',
				worksheetType: '',
				worksheetStatus: '',
				worksheetDetails: '',
				worksheetResult: '',
				userName: '',
				userPhone: '18223323333',
				userMail: '',
				resValue: '1',
				effValue: '3',
				attValue: '5',
				advValue: 'rrbgfb'
			}

		},
		created: function() {
			this.init();
		},
		methods: {
			init() {
				var urlObj = util.parseQueryString(location.search);
			},
			evaluate() {
				var _$$this = this;
				var filter = {
					id: _$$this.$data.worksheetno,
					consequence:_$$this.$data.resValue,
					effiency: _$$this.$data.effValue,
					attitude: _$$this.$data.attValue,
					advice: _$$this.$data.advValue
				};
				_$$this.$http.get('/geely/api/worksheet/evaluate/', {
					emulateJSON: true,
					params: filter
				}).then((_ret) => {
					console.log(_ret);
				}).catch((_err) => {
					console.log(_err);
				})
			}

		}
	}
</script>

<style>
.m-circle{
	display: inline-block;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	border: 4px solid #2fab1a;
}
.m-number{
	display: block;
	text-align: center;
	height: 40px;
	line-height: 40px;
	color: #2fab1a;
}
.m-details .el-form-item{
	margin: 0 12px;
}
.f-evaluate{
	left: 25%;
    position: absolute;
    width: 200px;
}
.f-usermsg{
	position: absolute;
	width: 200px;
	left: 25%;
	margin:0 -12px;
}
.m-details{
	margin-bottom: 0;
}
.m-details input{
	height: 25px;
	margin-bottom: 0
}
.m-usermsg{
	height:110px;
}
.f-usermsg .el-input{width:120px;}
.f-usermsg .el-form-item{margin: 0;}
.el-rate{
	margin-top: 7px;
}
.el-button{
	margin: 11px 0;
	width: 200px;
}
.el-input{
	width: 200px;
}
.m-circle{
	margin: 0 15px
}
.m-status{
	margin: 0 15px;
}

</style>