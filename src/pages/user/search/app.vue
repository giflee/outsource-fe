<template>
	<div id="app">
		<el-row>
			<el-col :span="22" :offset="1">
				<el-input placeholder="客户中心编号/手机号码/VIN号/车牌号" v-model="keyword" icon="search"></el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-tabs v-model="activeName">
				<el-tab-pane label="用户信息" name="first">
					用户信息
				</el-tab-pane>
				<el-tab-pane label="车辆信息" name="second">
					车辆信息
				</el-tab-pane>
				<el-tab-pane label="维保工单" name="third">
					<el-collapse accordion>
						<el-collapse-item title="2011-23-22" name="1">
							<h3>基础信息</h3>
							<el-form label-width="120px">
								<el-form-item label="工单号">
									<span>{{ruleForm.workorder_no}}</span>
								</el-form-item>
								<el-form-item label="业务大区">
									<span>{{ruleForm.area}}</span>
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
	export default {
		data() {
			return {
				activeName: 'first',
				ruleForm: {
					workorder_no: '',
					area: ''
				}
			}
		}
	}
</script>

<style lang="css"></style>