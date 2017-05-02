<template>
	<div id="app">
		<el-row>
			<el-col :span="22" :offset="1">
				<el-input placeholder="客户中心编号/手机号码/VIN号/车牌号" v-model="keyword" class="u-ipt">
					<el-select v-model="key" placeholder="请选择" slot="prepend" class="u-sel">
						<el-option label="客户中心编号" value="cust_no"></el-option>
						<el-option label="vin号" value="vin"></el-option>
						<el-option label="手机号码" value="tel"></el-option>
						<el-option label="车牌号" value="memberId"></el-option>
					</el-select>
					<!--  <template slot="prepend">Http://</template> -->
					<el-button slot="append" icon="search" @click="getUserInfo"></el-button>
				</el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-tabs v-model="activeName" @tab-click="selectTab">
				<el-tab-pane label="用户信息" name="first">
					<el-form :label-position="POSITION_WAY" label-width="140px">
						<el-form-item label="数据中心编号">
							<el-input v-model="userInfo.cust_no" @blur="updateInfo('cust_no', userInfo.cust_no)"></el-input>
						</el-form-item>
						<el-form-item label="姓名">
							<el-input v-model="userInfo.cust_name" @blur="updateInfo('cust_name', userInfo.cust_name)"></el-input>
						</el-form-item>
						<el-form-item label="性别">
							<el-input v-model="userInfo.gender" @blur="updateInfo('gender', userInfo.gender)"></el-input>
						</el-form-item>
						<el-form-item label="电话">
							<el-input v-model="userInfo.tel" @blur="updateInfo('tel', userInfo.tel)"></el-input>
						</el-form-item>
						<el-form-item label="客户来源">
							<el-input v-model="userInfo.source_from" @blur="updateInfo('source_from', userInfo.source_from)"></el-input>
						</el-form-item>
						<el-form-item label="固定电话">
							<el-input v-model="userInfo.fixed_tel" @blur="updateInfo('fixed_tel', userInfo.fixed_tel)"></el-input>
						</el-form-item>
						<el-form-item label="微信号">
							<el-input v-model="userInfo.weixin" @blur="updateInfo('weixin', userInfo.weixin)"></el-input>
						</el-form-item>
						<el-form-item label="QQ号">
							<el-input v-model="userInfo.qq" @blur="updateInfo('qq', userInfo.qq)"></el-input>
						</el-form-item>
						<el-form-item label="邮箱">
							<el-input v-model="userInfo.email" @blur="updateInfo('email', userInfo.email)"></el-input>
						</el-form-item>
						<el-form-item label="省份">
							<el-input v-model="userInfo.province" @blur="updateInfo('province', userInfo.province)"></el-input>
						</el-form-item>
						<el-form-item label="城市">
							<el-input v-model="userInfo.city" @blur="updateInfo('city', userInfo.city)"></el-input>
						</el-form-item>
						<el-form-item label="区/县">
							<el-input v-model="userInfo.county" @blur="updateInfo('county', userInfo.county)"></el-input>
						</el-form-item>
						<el-form-item label="使用性质">
							<el-input v-model="userInfo.use_nature" @blur="updateInfo('use_nature', userInfo.use_nature)"></el-input>
						</el-form-item>
						<el-form-item label="行业">
							<el-input v-model="userInfo.industry" @blur="updateInfo('industry', userInfo.industry)"></el-input>
						</el-form-item>
						<el-form-item label="文化水平">
							<el-input v-model="userInfo.education" @blur="updateInfo('education', userInfo.education)"></el-input>
						</el-form-item>
						<el-form-item label="证件类型">
							<el-input v-model="userInfo.certificate_type" @blur="updateInfo('certificate_type', userInfo.certificate_type)"></el-input>
						</el-form-item>
						<el-form-item label="证件号码">
							<el-input v-model="userInfo.certificate_no" @blur="updateInfo('certificate_no', userInfo.certificate_no)"></el-input>
						</el-form-item>
						<el-form-item label="详细地址">
							<el-input v-model="userInfo.addr" @blur="updateInfo('addr', userInfo.addr)"></el-input>
						</el-form-item>
						<el-form-item label="建档日期">
							<span>{{userInfo.build_date}}</span>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="车辆信息" name="second">
					<el-collapse accordion v-for="(item, index) in userInfo.details" v-model="initShowIndex">
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
				</el-tab-pane>
				<el-tab-pane label="维保工单" name="third" class="scroll-content">
					<el-collapse accordion>
						<el-collapse-item title="2011-23-22" name="1">
							<h3>基础信息</h3>
							<el-form :label-position="POSITION_WAY" label-width="140px">
								<el-form-item label="工单号">
									<span>{{ruleForm.workorder_no}}</span>
								</el-form-item>
								<el-form-item label="业务大区">
									<span>{{ruleForm.area}}</span>
								</el-form-item>
								<el-form-item label="服务站代码">
									<span>{{ruleForm.dealer_code}}</span>
								</el-form-item>
								<el-form-item label="服务站名称">
									<span>{{ruleForm.dealer_name}}</span>
								</el-form-item>
								<el-form-item label="服务站地址">
									<span>{{ruleForm.service_addr}}</span>
								</el-form-item>
								<el-form-item label="服务站联系人">
									<span>{{ruleForm.service_link_man}}</span>
								</el-form-item>
								<el-form-item label="服务站联系人电话">
									<span>{{ruleForm.service_link_tel}}</span>
								</el-form-item>
								<el-form-item label="服务站号">
									<span>{{ruleForm.service_no}}</span>
								</el-form-item>
								<el-form-item label="分厂">
									<span>{{ruleForm.child_no}}</span>
								</el-form-item>
								<el-form-item label="送修人/维修人">
									<span>{{ruleForm.send_man}}</span>
								</el-form-item>
								<el-form-item label="送修人/维修人电话">
									<span>{{ruleForm.send_man_tel}}</span>
								</el-form-item>
								<el-form-item label="维修类型">
									<span>{{ruleForm.repeat_type}}</span>
								</el-form-item>
								<el-form-item label="维修耗时">
									<span>{{ruleForm.user_times}}</span>
								</el-form-item>
								<el-form-item label="VIN号">
									<span>{{ruleForm.vin}}</span>
								</el-form-item>
								<el-form-item label="行驶/进站里程">
									<span>{{ruleForm.mileage}}</span>
								</el-form-item>
								<el-form-item label="车牌号码">
									<span>{{ruleForm.license_no}}</span>
								</el-form-item>
								<el-form-item label="进站日期">
									<span>{{ruleForm.in_date}}</span>
								</el-form-item>
								<el-form-item label="用户中心客户编号">
									<span>{{ruleForm.cust_no}}</span>
								</el-form-item>
								<el-form-item label="客户姓名">
									<span>{{ruleForm.cust_name}}</span>
								</el-form-item>
							</el-form>
							<h3>工单配件明细</h3>
							<el-form :label-position="POSITION_WAY" label-width="140px">
								<el-form-item label="配件号">
									<span>{{ruleForm.part_details.part_no}}</span>
								</el-form-item>
								<el-form-item label="配件名称">
									<span>{{ruleForm.part_details.part_name}}</span>
								</el-form-item>
								<el-form-item label="配件数量">
									<span>{{ruleForm.part_details.amount}}</span>
								</el-form-item>
								<el-form-item label="配件单价">
									<span>{{ruleForm.part_details.unit_price}}</span>
								</el-form-item>
								<el-form-item label="费用类别/收费方式">
									<span>{{ruleForm.part_details.cost_type}}</span>
								</el-form-item>
							</el-form>
							<h3>工单维修项目明细</h3>
							<el-form :label-position="POSITION_WAY" label-width="140px;">
								<el-form-item label="维修项目代码">
									<span>{{ruleForm.item_details.item_code}}</span>
								</el-form-item>
								<el-form-item label="维修项目名称">
									<span>{{ruleForm.item_details.item_name}}</span>
								</el-form-item>
								<el-form-item label="维修工时">
									<span>{{ruleForm.item_details.man_hour}}</span>
								</el-form-item>
								<el-form-item label="工时单价">
									<span>{{ruleForm.item_details.unit_price}}</span>
								</el-form-item>
								<el-form-item label="费用类别/收费方式">
									<span>{{ruleForm.item_details.const_type}}</span>
								</el-form-item>
								<el-form-item label="操作代码">
									<span>{{ruleForm.item_details.operation_code}}</span>
								</el-form-item>
								<el-form-item label="修理工">
									<span>{{ruleForm.item_details.repair_by}}</span>
								</el-form-item>
							</el-form>
						</el-collapse-item>
					</el-collapse>
				</el-tab-pane>
			</el-tabs>
		</el-row>
	</div>
</template>

<script>
	const util = require('../../../util.js')
	export default {
		data() {
			return {
				activeName: 'first',
				POSITION_WAY: 'left',
				initShowIndex: '0',
				key: 'tel',
				ruleForm: {
					workorder_no: '',
					area: '',
					dealer_code: '',
					dealer_name: '',
					service_addr: '',
					service_link_man: '',
					service_link_tel: '',
					service_no: '',
					child_no: '',
					send_man: '',
					send_man_tel: '',
					repeat_type: '',
					user_times: '',
					vin: '',
					mileage: '',
					license_no: '',
					in_date: '',
					cust_no: '',
					cust_name: '',
					part_details: {
						part_no: '',
						part_name: '',
						amount: '',
						unit_price: '',
						cost_type: ''
					},
					item_details: {
						item_code: '',
						item_name: '',
						man_hour: '',
						unit_price: '',
						const_type: '',
						operation_code: '',
						repair_by: ''
					}
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
						{
							license_no: '浙A99999',
							dealer_code: 'wwww',
							series: '22e2e',
							model_name: 'wdwd',
							vin: 'wdwd',
							vsn: 'rdwd',
							color: 'wdwd',
							engine_no: 'dwdwd',
							sale_date: 'dwdw',
							bill_date: 'wdwd'
						},
						{
							license_no: '浙A99999',
							dealer_code: 'wwww',
							series: '22e2e',
							model_name: 'wdwd',
							vin: 'wdwd',
							vsn: 'rdwd',
							color: 'wdwd',
							engine_no: 'dwdwd',
							sale_date: 'dwdw',
							bill_date: 'wdwd'
						}
					]
				}
			}
		},
		created: function() {
			this.init();
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
				var filter = {
					key: _$$this.key,
					keyword: _$$this.keyword || ''
				}
				console.log(filter);
				_$$this.$http.post('/api/user/search', filter).then((_ret) => {
					console.log(_ret);
					_.merge(_$$this.$data.userInfo, _ret.body.result, true);
				}).catch((_err) => {
					_$$this.$message({
						shoeClose: true,
						message: _err.body.message,
						type: 'error'
					})
				})
			},
			selectTab(tab, event) {
				var _$$this = this;
				var filter = {
					key: 'tel',
					keyword: _$$this.keyword || '',
					limit: 50,
					offset: 0
				}
				if (tab.index == 2) {
					_$$this.$http.post('/api/user/workorder/search',filter).then((_ret) => {
						console.log(_ret);
						_.merge(_$$this.$data.ruleForm, _ret.body.result, true);
					}).catch((_err) => {
						_$$this.$message({
							shoeClose: true,
							message: _err.body.message,
							type: 'error'
						})
					})
				}
			},
			updateInfo(type, value) {
				var filter = {
					key: type,
					value: value
				}
				this.$http.post('/api/user/update', filter).then((_ret) => {
					console.log(_ret);
					if (_ret.body.code != 200) {
						this.$message({
							shoeClose: true,
							message: _ret.body.message,
							type: 'error'
						})
					}
				}).catch((_err) => {
					this.$message({
						shoeClose: true,
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
		width: 111px;
	}
</style>