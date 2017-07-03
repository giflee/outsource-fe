<template>
<div id="app" class="g-main">
		<div class="m-status">
			<div class="m-line"></div>
			<div class="m-circle">
	         	<span class="m-number">1</span>
	         	<span class="m-text">未受理</span>
	    	</div>
	    	<div class="m-circle">
	    		<span class="m-number">2</span>
	    		<span class="m-text">受理中</span>
	    	</div>
	    	<div class="m-circle" v-bind:class="{ 'm-circle3': unCmp }">
	    		<span class="m-number"  v-bind:class="{ 'm-number3': unCmp }">3</span>
	    		<span class="m-text"  v-bind:class="{ 'm-text3': unCmp }">已完成</span>
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
			<el-form-item label="用户信息" class="m-usermsg">
				<el-form class="f-usermsg" label-position="left">
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
						v-model="resValue" 
						:colors="['#99A9BF', '#F7BA2A', '#FF9900']">
						</el-rate>
					</el-form-item>
					<el-form-item label="处理时效">
						<el-rate 
						v-model="effValue" 
						:colors="['#99A9BF', '#F7BA2A', '#FF9900']">
						</el-rate>
					</el-form-item>
					<el-form-item label="服务态度">
						<el-rate 
						v-model="attValue" 
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
	const moment = require('moment')
	export default {
		data() {
			return {
				unCmp: true,
				worksheetno: '',
				createTime: '',
				worksheetType: '',
				worksheetStatus: '',
				worksheetDetails: '',
				userName: '',
				userPhone: '18223323333',
				userMail: '',
				resValue: 1,
				effValue: 3,
				attValue: 5,
				advValue: 'rrbgfb'
			}

		},
		created: function() {
			this.init();
			this.getInitInfo();
		},
		methods: {
			init() {
				var urlObj = util.parseQueryString(location.search);
			},
			getInitInfo() {
				var urlObj = util.parseQueryString(location.search);
				var _$$this = this;
				var filter = {
					id: urlObj.id
				}
				_$$this.$http.get('/geely/api/ticket/get/',{
						emulateJSON: true,
						params: filter
					}).then((_ret) => {
						if(_ret.body.code == 200){
							_$$this.$data.createTime = moment(_ret.body.result.createTime).format('YYYY-MM-DD HH:mm:ss');
							_$$this.$data.worksheetno = urlObj.id						
						}else{

						}
					}).catch((_err) => {
						
					})						
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
.m-status{
	margin: 0 12px;
	text-align: center;
	vertical-align: center;
	position: relative;

}
.m-status .m-circle{
	display: inline-block;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	margin: 0 12px;
	border: 4px solid #2fab1a;
}
.m-status .m-circle3{
	border: 4px solid #eeeeee;
}
.m-status .m-number{
	display: block;
	text-align: center;
	height: 50px;
	line-height: 50px;
	color: #2fab1a;
}
.m-status .m-number3{
	color: #eee;
}

.m-status span.m-text{
	color: #2fab1a;
}
.m-status span.m-text3{
	color: #eeeeee;
}
.m-line{
    position: absolute;
    z-index: -5;
    left: 10%;
    top: 40%;
	width:80%;
	height:10px;
	background: #eee;
}
.m-details .el-form-item{
	margin: 0 12px;
}
.el-form-item__content{
	margin-left: 68px; 
	word-wrap:break-word;
}
.m-usermsg{
	height:110px;
}
.f-usermsg{
	margin: 0 -12px;
}
.m-evaluate{
	margin: 0 12px;
}
.m-evaluate textarea{
	width: 200px;
}
.el-rate{
	margin-top: 7px;
}
.el-button{
	margin: 11px 0;
	width: 200px;
}
</style>