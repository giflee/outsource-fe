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
			<el-form-item label="工单标题">
				<template>
					<span>{{ detailsData.title }}</span>
      			</template>
			</el-form-item>
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
			<el-form-item label="工单内容">
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
						<span>{{ detailsData.userEmail }}</span>
					</el-form-item>
				</el-form>
			</el-form-item>
		</el-form>
	</div>
	<hr v-if="noEvaluate">
	<div class="m-evaluate" v-if="noEvaluate">
		<el-form>
			<el-form-item label="工单评价">
				<el-form class="f-evaluate">
					<el-form-item :label="detailsData.custom[0].name">
						<el-rate 
						v-model="resValue" 
						:colors="['#99A9BF', '#F7BA2A', '#FF9900']" :disabled="!detailsData.canEvaluate">
						</el-rate>
					</el-form-item>
					<el-form-item :label="detailsData.custom[1].name">
						<el-rate 
						v-model="effValue" 
						:colors="['#99A9BF', '#F7BA2A', '#FF9900']" :disabled="!detailsData.canEvaluate">
						</el-rate>
					</el-form-item>
					<el-form-item :label="detailsData.custom[2].name">
						<el-rate 
						v-model="attValue" 
						:colors="['#99A9BF', '#F7BA2A', '#FF9900']" :disabled="!detailsData.canEvaluate">
						</el-rate>
					</el-form-item>
					<el-form-item>
						<el-input
						type="textarea"
						:autosize="{ minRows: 2, maxRows: 4}"
						placeholder="其他建议或意见"
						:disabled="!detailsData.canEvaluate"
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
				noEvaluate: false,
				resValue: 0,
				attValue: 0,
				effValue: 0,
				advValue:''
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
							_$$this.$data.detailsData.id = urlObj.id
							_.merge(_$$this.$data.detailsData, _ret.body.result, true);
							// 工单评价是否显示以及其他建议值
							if (_ret.body.result.custom) {
								if (_ret.body.result.custom.length) {
									_$$this.$data.noEvaluate = true;
									this.$data.detailsData.custom.forEach(function(item){
										if (item.name == '其他建议或意见'){
											_$$this.$data.advValue = item.value;
										}
									})
								}
							}else if (_ret.body.result.custom.length == 0) {
								_$$this.$data.noEvaluate = false;
							}
							// 工单内容在未完结时显示为空，完结后显示最近一条操作的内容
							if(_ret.body.result.comments.length > 0){
								if(_ret.body.result.status == 20){
									_$$this.$data.detailsData.comment = _ret.body.result.comments[0].comment;
								}else {
									_$$this.$data.detailsData.comment = "";
								}
							}
							// 工单状态直观显示
							if(_ret.body.result.status == 20){
								_$$this.$data.unCmp = false;
							}else{
								_$$this.$data.unCmp = true;
							}
							// 工单状态值
							if(_ret.body.result.typeStr == ""){
								_$$this.$data.detailsData.typeStr = '未分类';
							}else{
								_$$this.$data.detailsData.typeStr = _ret.body.result.typeStr;
							}					
						}else{
							_$$this.$toast(_ret.body.message);
						}
					}).catch((_err) => {					
						_$$this.$toast('服务器出错');
					}).finally((_ret) => {
						this.shuxingxing();
						this.$forceUpdate();
					})						
			},
			evaluate() {
				var _$$this = this;
				if (!_$$this.$data.resValue || !_$$this.$data.effValue || !_$$this.$data.attValue) {
					this.$toast('请填写完整的三项评价');
					return;
				}
				var filter = {
					id: _$$this.$data.detailsData.id,
					consequence:_$$this.$data.resValue,
					effiency: _$$this.$data.effValue,
					attitude: _$$this.$data.attValue,
					advice: _$$this.$data.advValue
				};
				_$$this.$http.get('/geely/api/worksheet/evaluate/', {
					emulateJSON: true,
					params: filter
				}).then((_ret) => {
					if (_ret.body.code == 200) {
						_$$this.$data.detailsData.canEvaluate = false;
						_$$this.$toast('评价成功');
						// 评价状态刷新
						_$$this.$forceUpdate();
					}else{
						_$$this.$toast(_ret.body.message);
					}
				}).catch((_err) => {
					_$$this.$toast('服务器出错');
				})
			},
			shuxingxing() {
				var _$$this = this;
				if (this.$data.detailsData.custom) {
					this.$data.detailsData.custom.forEach(function(item){
						if (item.name.indexOf('处理结果') > -1) _$$this.$data.resValue = item.value.length;
						if (item.name.indexOf('服务态度') > -1) _$$this.$data.attValue = item.value.length;
						if (item.name.indexOf('处理时效') > -1) _$$this.$data.effValue = item.value.length;
					})
				}
			}
		},
		filters: {
				time: function(value) {
					if (!value)  return '';
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
.g-main{
	margin-top: 10px;
}
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
	font-size: 26px;
}
.m-status .m-number3{
	color: #eee;
}

.m-status span.m-text{
	color: #2fab1a;
	display: inline-block;
	margin-top: 8px; 
}
.m-status span.m-text3{
	color: #eeeeee;
}
.m-line{
    position: absolute;
    z-index: -5;
    left: 10%;
    top: 30%;
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
.f-usermsg span{
	display: flex;
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