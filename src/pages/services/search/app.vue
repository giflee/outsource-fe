<template>
	<div id="app">
		<div class="m-search">
			<el-input placeholder="请输入经销商/服务商关键词" icon="search" v-model="keyword"></el-input>
			<el-row :gutter="20" type="flex" class="margin-15-row">
				<el-col :span="12">
					<el-button type="primary" icon="search" @click="serachSell" class="fix-btn">搜索经销商</el-button>
				</el-col>
				<el-col :span="12">
					<el-button type="primary" icon="search" @click="searchService" class="fix-btn">搜索服务商</el-button>
				</el-col>
			</el-row>
		</div>
		<div class="m-result">
			<el-row v-show="hasData">
				<el-form label-position="left" label-width="150px" v-for="(item, index) in services">
					<el-form-item label="业务大区" v-show="item.area">
						<span>{{item.area}}</span>
					</el-form-item>
					<el-form-item label="服务商(经销商)代码" v-show="item.dealerCode">
						<span>{{item.dealerCode}}</span>
					</el-form-item>
					<el-form-item label="服务商(经销商)名称" v-show="item.dealerName">
						<span>{{item.dealerName}}</span>
					</el-form-item>
					<el-form-item label="服务站号" v-show="item.serviceNo">
						<span>{{item.serviceNo}}</span>
					</el-form-item>
					<el-form-item label="分厂" v-show="item.childNo">
						<span>{{item.childNo}}</span>
					</el-form-item>
					<el-form-item label="联系人" v-show="item.linkMan">
						<span>{{item.linkMan}}</span>
					</el-form-item>
					<el-form-item label="联系电话" v-show="item.tel">
						<span>{{item.tel}}</span>
					</el-form-item>
					<el-form-item label="经营地址" v-show="item.addr">
						<span>{{item.addr}}</span>
					</el-form-item>
				</el-form>
			</el-row>
			<el-row class="text-center" v-show="!hasData && !firstSearch">
				<span>抱歉，搜索不到相关信息</span>
			</el-row>
			<el-row class="text-center" v-show="firstSearch">
				<!-- <span>请输入关键字进行查找</span> -->
			</el-row>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				services: [
					{
						"addr": "7STEv9KErx",
						"area": "Hp27UXJv7N",
						"dealerCode": "g8Er925Ph2",
						"dealerName": "zUPbIQs1kQ",
						"linkMan": "gAXGjDfAPW",
						"tel": "IIlcaBnMtP"
					}
				],
				hasData: false,
				firstSearch: true
			}
		},
		methods: {
			serachSell() {
				var filter = {
					keyWord: this.$data.keyword
				}
				this.$http.post('/api/dealer/query', filter).then((_ret) => {
					console.log(_ret);
					_ret.body.result.length > 0 ? this.$data.hasData = true : this.$data.hasData = false;
					_.merge(this.$data.services, _ret.body.result, true);

				}).catch((_err) => {
					this.$message({
						showClose: true,
						message: _err.body.message,
						type: 'error'
					})
				})
				this.$data.firstSearch = false;
			},
			searchService() {
				var filter = {
					keyWord: this.$data.keyword
				}
				this.$http.post('/api/facilitator/query', filter).then((_ret => {
					console.log(_ret);
					_ret.body.result.length > 0 ? this.$data.hasData = true : this.$data.hasData = false;
					_.merge(this.$data.services, _ret.body.result, true);
				})).catch((_err) => {
					this.$message({
						showClose: true,
						message: _err.body.message,
						type: 'error'
					})
				})
				this.$data.firstSearch = false;
			}
		}
	}
</script>

<style lang="postcss">
	.fix-btn{
		width: 100%;
	}
	.text-center{
		text-align: center;
	}
	.m-search{
		margin-top: 15px;
		margin-bottom: 15px;
	}
	.margin-15-row{
		margin-top: 15px;
		margin-bottom: 15px;	
	}
</style>