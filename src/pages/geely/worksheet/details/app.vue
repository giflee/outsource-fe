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
					<span>{{ detailsData.id }}</span>
      			</template>
			</el-form-item>
			<el-form-item label="创建时间">
				<span>{{ detailsData.createTime | time}}</span>
			</el-form-item>
			<el-form-item label="工单分类">
				<span>{{ detailsData.typeStr }}</span>
				</el-form-item>
			<el-form-item label="工单状态">
				<span>{{ detailsData.status | status}}</span>
			</el-form-item>
			<el-form-item label="工单详情">
				<span>{{ detailsData.content }}</span>
			</el-form-item>
			<el-form-item label="处理结果">
				<span>{{ detailsData.comment }}</span>
			</el-form-item>
			<el-form-item label="用户信息" class="m-usermsg">
				<el-form class="f-usermsg" label-position="left">
					<el-form-item label="姓名" label-width="68px">
						<span>{{ detailsData.userName }}</span>
					</el-form-item>
					<el-form-item label="手机号码" label-width="68px">
						<span>{{ detailsData.userMobile }}</span>
					</el-form-item>
					<el-form-item label="邮箱" label-width="68px">
						<span>{{ detailsData.userMail }}</span>
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
							size=""  @click="evaluate" :disabled="!detailsData.canEvaluate">
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
				detailsData: {
					userMobile: '',
					worksheetType: '',
				},
				unCmp: true,
				resValue: 0,
				attValue: 0,
				effValue: 0,
				advValue:''
			}
		},
		created: function() {
			this.init();
			this.getInitInfo();
			// Toast('提示信息');
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
							_$$this.$data.detailsData.id = urlObj.id
							_$$this.$data.advValue = _ret.body.result.custom[3].value
							_$$this.$data.detailsData.comment = _ret.body.result.comments[(_ret.body.result.comments).length-1].comment;
							if(_ret.body.result.status == 10){
								_$$this.$data.unCmp = true;
							}else{
								_$$this.$data.unCmp = false;
							}
							_.merge(_$$this.$data.detailsData, _ret.body.result, true);
							if(_ret.body.result.typeStr == ""){
								_$$this.$data.detailsData.typeStr = '未分类';
							}else{
								_$$this.$data.detailsData.typeStr = _ret.body.result.typeStr;
							}					
						}else{

						}
					}).catch((_err) => {					

					}).finally((_ret) => {
						this.shuxingxing();
					})						
			},
			evaluate() {
				var _$$this = this;
				var filter = {
					id: _$$this.$data.detailsData.id,
					consequence:_$$this.$data.resValue,
					effiency: _$$this.$data.effValue,
					attitude: _$$this.$data.attValue,
					advice: _$$this.$data.detailsData.advValue
				};
				_$$this.$http.get('/geely/api/worksheet/evaluate/', {
					emulateJSON: true,
					params: filter
				}).then((_ret) => {
					console.log(_ret);
				}).catch((_err) => {
					console.log(_err);
				})
			},
			shuxingxing() {
				var _$$this = this;
				this.$data.detailsData.custom.forEach(function(item){
					if (item.name == '处理结果') _$$this.$data.resValue = item.value.length;
					if (item.name == '服务态度') _$$this.$data.attValue = item.value.length;
					if (item.name == '处理时效') _$$this.$data.effValue = item.value.length;
				})
			}
		},
		filters: {
				time: function(value) {
					return moment(value).format('YYYY-MM-DD HH:mm:ss');
				},
				status: function(value) {
					var map = {
						5 : '受理中',
						10 : '受理中',
						20 : '已完结',
						25 : '受理中'
					}
					return map[value];
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
	background-color: #ffffff;
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