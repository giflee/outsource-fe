<template>
	<div id="app">
		<el-row class="u-ipt-con">
			<el-col :span="22" :offset="1">
				<el-input placeholder="客户中心编号/手机号码/VIN号/车牌号" v-model.trim="keyword" class="u-ipt">
					<el-select v-model.trim="key" placeholder="请选择" slot="prepend" class="u-sel">
						<el-option label="客户中心编号" value="cust_no"></el-option>
						<el-option label="vin号" value="vin"></el-option>
						<el-option label="手机号码" value="tel"></el-option>
					</el-select>
					<el-button slot="append" icon="search" @click="getUserInfo"></el-button>
				</el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-tabs v-model="activeName" @tab-click="selectTab">
				<el-tab-pane label="用户信息" name="first">
					<el-form :label-position="POSITION_WAY" label-width="140px">
						<el-form-item label="数据中心编号">
							<span>{{userInfo.cust_no}}</span>
						</el-form-item>
						<el-form-item label="姓名">
							<el-input v-model.trim="userInfo.cust_name" @blur="updateInfo('cust_name', userInfo.cust_name)"></el-input>
						</el-form-item>
						<el-form-item label="性别">
							<el-select v-model="userInfo.gender" placeholder="请选择性别" @change="updateInfo('gender', userInfo.gender)">
								<el-option label="男" :value="genderMap.man"></el-option>
								<el-option label="女" :value="genderMap.woman"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="电话">
							<span>{{userInfo.tel}}</span>
						</el-form-item>
						<el-form-item label="客户来源">
							<el-input v-model.trim="userInfo.source_from" @blur="updateInfo('source_from', userInfo.source_from)"></el-input>
						</el-form-item>
						<el-form-item label="固定电话">
							<el-input v-model.trim="userInfo.fixed_tel" @blur="updateInfo('fixed_tel', userInfo.fixed_tel)"></el-input>
						</el-form-item>
						<el-form-item label="微信号">
							<el-input v-model.trim="userInfo.weixin" @blur="updateInfo('weixin', userInfo.weixin)"></el-input>
						</el-form-item>
						<el-form-item label="QQ号">
							<el-input v-model.trim="userInfo.qq" @blur="updateInfo('qq', userInfo.qq)"></el-input>
						</el-form-item>
						<el-form-item label="邮箱">
							<el-input v-model.trim="userInfo.email" @blur="updateInfo('email', userInfo.email)"></el-input>
						</el-form-item>
						<el-form-item label="省份">
							<el-input v-model.trim="userInfo.province" @blur="updateInfo('province', userInfo.province)"></el-input>
						</el-form-item>
						<el-form-item label="城市">
							<el-input v-model.trim="userInfo.city" @blur="updateInfo('city', userInfo.city)"></el-input>
						</el-form-item>
						<el-form-item label="区/县">
							<el-input v-model.trim="userInfo.county" @blur="updateInfo('county', userInfo.county)"></el-input>
						</el-form-item>
						<el-form-item label="使用性质">
							<el-input v-model.trim="userInfo.use_nature" @blur="updateInfo('use_nature', userInfo.use_nature)"></el-input>
						</el-form-item>
						<el-form-item label="行业">
							<el-input v-model.trim="userInfo.industry" @blur="updateInfo('industry', userInfo.industry)"></el-input>
						</el-form-item>
						<el-form-item label="文化水平">
							<el-input v-model.trim="userInfo.education" @blur="updateInfo('education', userInfo.education)"></el-input>
						</el-form-item>
						<el-form-item label="证件类型">
							<el-select v-model="userInfo.certificate_type" placeholder="请选择类型" @change="updateInfo('certificate_type', userInfo.certificate_type)">
								<el-option label="身份证" :value="idMap.a"></el-option>
								<el-option label="组织结构代码" :value="idMap.b"></el-option>
								<el-option label="税号" :value="idMap.c"></el-option>
								<el-option label="其他特殊证件" :value="idMap.d"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="证件号码">
							<el-input v-model.trim="userInfo.certificate_no" @blur="updateInfo('certificate_no', userInfo.certificate_no)"></el-input>
						</el-form-item>
						<el-form-item label="详细地址">
							<el-input v-model.trim="userInfo.addr" @blur="updateInfo('addr', userInfo.addr)"></el-input>
						</el-form-item>
						<el-form-item label="建档日期">
							<span>{{userInfo.build_date | formatDate}}</span>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="车辆信息" name="second">
					<el-collapse accordion v-for="(item, index) in userInfo.details" v-model.trim="initShowIndex" v-show="hasCar" class="car-info">
						<el-collapse-item :title="item.license_no" :name="index">
							<el-form :label-position="POSITION_WAY" label-width="140px">
								<el-form-item label="销售经销商代码">
									<span>{{item.dealer_code}}</span>
								</el-form-item>
								<el-form-item label="车系">
									<span>{{item.series}}</span>
								</el-form-item>
								<el-form-item label="车型">
									<span>{{item.model_name}}</span>
								</el-form-item>
								<el-form-item label="VIN">
									<span>{{item.vin}}</span>
								</el-form-item>
								<el-form-item label="VSN">
									<span>{{item.vsn}}</span>
								</el-form-item>
								<el-form-item label="颜色">
									<span>{{item.color}}</span>
								</el-form-item>
								<el-form-item label="发动机号">
									<span>{{item.engine_no}}</span>
								</el-form-item>
								<el-form-item label="销售/购车时间">
									<span>{{item.sale_date}}</span>
								</el-form-item>
								<el-form-item label="开票日期">
									<span>{{item.bill_date}}</span>
								</el-form-item>
								<el-form-item label="车牌号">
									<span>{{item.license_no}}</span>
								</el-form-item>
							</el-form>
						</el-collapse-item>
					</el-collapse>
					<el-row v-show="!hasCar" class="no-data">
						<span>抱歉，搜索不到相关信息</span>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="维保工单" name="third" class="scroll-content">
					<el-collapse accordion v-show="hasWorkorder" class="car-info">
						<el-collapse-item :title="item.in_date" name="1" v-for="(item, index) in ruleForm">
							<h3>基础信息</h3>
							<el-form :label-position="POSITION_WAY" label-width="140px">
								<el-form-item label="工单号">
									<span>{{item.workorder_no}}</span>
								</el-form-item>
								<el-form-item label="业务大区">
									<span>{{item.area}}</span>
								</el-form-item>
								<el-form-item label="服务站代码">
									<span>{{item.dealer_code}}</span>
								</el-form-item>
								<el-form-item label="服务站名称">
									<span>{{item.dealer_name}}</span>
								</el-form-item>
								<el-form-item label="服务站地址">
									<span>{{item.service_addr}}</span>
								</el-form-item>
								<el-form-item label="服务站联系人">
									<span>{{item.service_link_man}}</span>
								</el-form-item>
								<el-form-item label="服务站联系人电话">
									<span>{{item.service_link_tel}}</span>
								</el-form-item>
								<el-form-item label="服务站号">
									<span>{{item.service_no}}</span>
								</el-form-item>
								<el-form-item label="分厂">
									<span>{{item.child_no}}</span>
								</el-form-item>
								<el-form-item label="送修人/维修人">
									<span>{{item.send_man}}</span>
								</el-form-item>
								<el-form-item label="送修人/维修人电话">
									<span>{{item.send_man_tel}}</span>
								</el-form-item>
								<el-form-item label="维修类型">
									<span>{{item.repeat_type}}</span>
								</el-form-item>
								<el-form-item label="维修耗时">
									<span>{{item.user_times}}</span>
								</el-form-item>
								<el-form-item label="VIN号">
									<span>{{item.vin}}</span>
								</el-form-item>
								<el-form-item label="行驶/进站里程">
									<span>{{item.mileage}}</span>
								</el-form-item>
								<el-form-item label="车牌号码">
									<span>{{item.license_no}}</span>
								</el-form-item>
								<el-form-item label="进站日期">
									<span>{{item.in_date}}</span>
								</el-form-item>
								<el-form-item label="用户中心客户编号">
									<span>{{item.cust_no}}</span>
								</el-form-item>
								<el-form-item label="客户姓名">
									<span>{{item.cust_name}}</span>
								</el-form-item>
							</el-form>
							<h3>工单配件明细</h3>
							<el-form :label-position="POSITION_WAY" label-width="140px">
								<el-form-item label="配件号">
									<span>{{item.part_details[0].part_no}}</span>
								</el-form-item>
								<el-form-item label="配件名称">
									<span>{{item.part_details[0].part_name}}</span>
								</el-form-item>
								<el-form-item label="配件数量">
									<span>{{item.part_details[0].amount}}</span>
								</el-form-item>
								<el-form-item label="配件单价">
									<span>{{item.part_details[0].unit_price}}</span>
								</el-form-item>
								<el-form-item label="费用类别/收费方式">
									<span>{{item.part_details[0].cost_type}}</span>
								</el-form-item>
							</el-form>
							<h3>工单维修项目明细</h3>
							<el-form :label-position="POSITION_WAY" label-width="140px;">
								<el-form-item label="维修项目代码">
									<span>{{item.item_details[0].item_code}}</span>
								</el-form-item>
								<el-form-item label="维修项目名称">
									<span>{{item.item_details[0].item_name}}</span>
								</el-form-item>
								<el-form-item label="维修工时">
									<span>{{item.item_details[0].man_hour}}</span>
								</el-form-item>
								<el-form-item label="工时单价">
									<span>{{item.item_details[0].unit_price}}</span>
								</el-form-item>
								<el-form-item label="费用类别/收费方式">
									<span>{{item.item_details[0].const_type}}</span>
								</el-form-item>
								<el-form-item label="操作代码">
									<span>{{item.item_details[0].operation_code}}</span>
								</el-form-item>
								<el-form-item label="修理工">
									<span>{{item.item_details[0].repair_by}}</span>
								</el-form-item>
							</el-form>
						</el-collapse-item>
					</el-collapse>
					<el-row v-show="!hasWorkorder" class="no-data">
						<span>抱歉，搜索不到相关信息</span>
					</el-row>
				</el-tab-pane>
			</el-tabs>
		</el-row>
	</div>
</template>

<script>
	const util = require('../../../util.js')
	const moment = require('moment')
	export default {
		data() {
			return {
				activeName: 'first',
				POSITION_WAY: 'left',
				initShowIndex: '0',
				key: 'tel',
				hasCar: false,
				hasWorkorder: false,
				ruleForm: {
					
				},
				keyword: '',
				userInfo: {
					cust_no: '',
					cust_name: '',
					gender: '',
					tel: '',
					source_from: '',
					fixed_tel: '',
					weixin: '',
					qq: '',
					email: '',
					province: '',
					city: '',
					county: '',
					use_nature: '',
					industry: '',
					education: '',
					certificate_type: '',
					certificate_no: '',
					addr: '',
					build_date: '',
					details: [
						
					]
				},
				userInfoInit: {
					cust_no: '',
					cust_name: '',
					gender: '',
					tel: '',
					source_from: '',
					fixed_tel: '',
					weixin: '',
					qq: '',
					email: '',
					province: '',
					city: '',
					county: '',
					use_nature: '',
					industry: '',
					education: '',
					certificate_type: '',
					certificate_no: '',
					addr: '',
					build_date: '',
					details: [
						
					]
				},
				genderMap: {
					man: 0,
					woman: 1
				},
				idMap: {
					a: 0,
					b: 1,
					c: 2,
					d: 3
				}
			}
		},
		created: function() {
			this.init();
		},
		filters:{
		  	formatDate: function(value) {
		  		if (!value)  return '';
		  		return moment(value,"YYYYMMDDHHmmss").format('YYYY-MM-DD HH:mm:ss');
		  	}
		},
		methods: {
			init() {
				/**
				* 手机号的参数名字必须传tel
				*/
				var urlObj = util.parseQueryString(location.search);
				_.merge(this.$data.userInfo, urlObj, true);
				this.$data.keyword = urlObj.tel;

				this.getUserInfo();
			},
			getUserInfo() {
				var _$$this = this;

				if (!(_$$this.$data.keyword)) return;
				var filter = {
					key: _$$this.key,
					keyWord: _$$this.keyword || ''
				}
				console.log(filter);
				_$$this.$http.post('/api/user/search', filter).then((_ret) => {
					console.log(_ret);
					if (_ret.body.code != 200) {
						this.$message({
							showClose: true,
							message: _ret.body.message,
							type: 'error'
						})
						return;
					}
					if (_ret.body.result.length == 0) {
						_.merge(_$$this.$data.userInfo, _$$this.$data.userInfoInit)
						return;
					}else{
						_.merge(_$$this.$data.userInfo, _ret.body.result[0], true);
						if (_ret.body.result[0].details) {
							_ret.body.result[0].details.length > 0 ? _$$this.$data.hasCar = true : _$$this.$data.hasCar = false;
						}
					}
		
				}).catch((_err) => {
					_$$this.$message({
						showClose: true,
						message: _err.body.message || '',
						type: 'error'
					})
					_$$this.$data.hasCar = false;
				})
			},
			selectTab(tab, event) {
				var _$$this = this;
				if (tab.index == 2) {
					_$$this.getWorkorderInfo();
				}else{
					this.getUserInfo();
				}
			},
			getWorkorderInfo() {
				var _$$this = this;
				if (!(_$$this.$data.keyword)) return;
				var filter = {
					key: _$$this.key,
					keyWord: _$$this.keyword || ''
				}
				_$$this.$http.post('/api/user/workorder/search',filter).then((_ret) => {
					console.log(_ret);
					_.merge(_$$this.$data.ruleForm, _ret.body.result, true);
					if (_ret.body.code != 200) {
						this.$message({
							showClose: true,
							message: _ret.body.message || '',
							type: 'error'
						})
					}
					if (_ret.body.result.length > 0) {
						_$$this.$data.hasWorkorder = true;
					}else{
						_$$this.$data.hasWorkorder = false;
					}
				}).catch((_err) => {
					_$$this.$message({
						showClose: true,
						message: _err.body.message,
						type: 'error'
					})
				})
			},
			updateInfo(type, value) {
				var filter = {
					key: type,
					value: value,
					searchKey: this.key,
					keyWord: this.keyword || ''
				}
				this.$http.post('/api/user/update', this.$data.userInfo).then((_ret) => {
					console.log(_ret);
					if (_ret.body.code != 200) {
						this.$message({
							showClose: true,
							message: _ret.body.message || '',
							type: 'error'
						})
					}
				}).catch((_err) => {
					this.$message({
						showClose: true,
						message: _err.body.message,
						type: 'error'
					})
				})
			}
		}
	}
</script>

<style lang="css">
	.u-sel{
		width: 141px;
	}
	#app{
		padding-left: 15px;
		padding-right: 15px;
	}
	.el-tabs__nav{
		width: 100%;
		margin-left: -15px;
		margin-right: -15px;
	}
	.el-tabs__item{
		width: 33.333%;
		text-align: center;
	}
	.el-tabs__active-bar{
		width: 33.333%;
	}
	.u-ipt-con{
		padding-top: 20px;
		padding-bottom: 15px;
		position: fixed;
		top: 0px;
		left: 0px;
		background-color: #fff;
		z-index: 100;

	}
	.el-tabs__header{
		position: fixed;
		top: 64px;
		left: 0px;
		width: 100%;
		background-color: #fff;
		z-index: 100;
	}
	.el-tabs__content{
		margin-top: 115px;
		z-index: 0;
	}
	.car-info .el-form-item{
		margin-bottom: 0px;
	}
	.no-data{
		text-align: center;
		margin-top: 100px;
	}
</style>