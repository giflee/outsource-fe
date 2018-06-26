<template>
	<div id="app">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
			<el-form-item label="客户姓名" prop="cust_name">
				<el-input v-model.trim="ruleForm.cust_name"></el-input>
			</el-form-item>
			<el-form-item label="客户热度" prop="cust_hot">
				<span>{{ruleForm.cust_hot}}</span>
			</el-form-item>
			<el-form-item label="厂家线索渠道" prop="source_from">
				<span>{{ruleForm.source_from}}</span>
			</el-form-item>
			<el-form-item label="意向经销商编号" prop="dealer_code">
				<span>{{ruleForm.dealer_code}}</span>
			</el-form-item>
			<el-form-item label="意向经销商名称" prop="dealer_name"> 
				<span>{{ruleForm.dealer_name}}</span>
			</el-form-item>
			<el-form-item label="意向车型" prop="inten_model">
				<!-- <el-input v-model.trim="ruleForm.inten_model"></el-input> -->
				<el-select v-model="inten_model_arr" multiple collapse-tags placeholder="请选择意向车型">
					<el-option v-for="item in inten_model_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="其他意向车型" prop="inten_model_remark">
				<span>{{ruleForm.inten_model_remark}}</span>
			</el-form-item>
			<el-form-item label="手机" prop="tel">
				<span>{{ruleForm.tel}}</span>
			</el-form-item>
			<el-form-item label="性别" prop="gender">
				<el-select v-model="ruleForm.gender" placeholder="请选择性别" @visible-change="changeType">
					<el-option label="请选择" value=""></el-option>
					<el-option label="男" :value="genderMap.man"></el-option>
					<el-option label="女" :value="genderMap.woman"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="来源活动" prop="source_activity">
				<span>{{ruleForm.source_activity}}</span>
			</el-form-item>
			<el-form-item label="线索获取时间" prop="get_date">
				<span>{{ruleForm.get_date | formatDate}}</span>
			</el-form-item>
			<el-form-item label="预约购车时间" prop="predict_buy_date">
				<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.predict_buy_date" :editable="disabled" @change="save()"> 
				</el-date-picker>
			</el-form-item>
			<el-form-item label="省份" prop="provinceArr">
				<!-- <el-input v-model.trim="ruleForm.province"></el-input> -->
				<el-select v-model="ruleForm.province" placeholder="请选择省份" @visible-change="changeTypeProvince">
					<el-option :label="item" :value="item" v-for="item in provinceArr"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="城市" prop="city">
				<!-- <el-input v-model.trim="ruleForm.city"></el-input> -->	
				<el-select v-model="ruleForm.city" placeholder="请选择城市" @visible-change="changeType">
					<el-option :label="item" :value="item" v-for="item in cityArr[ruleForm.province]"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="备注" prop="remark">
			    <el-input type="textarea" v-model.trim="ruleForm.remark"></el-input>
			</el-form-item>
			<el-form-item label="备注1" prop="remark_one">
			    <el-input type="textarea" v-model.trim="ruleForm.remark_one"></el-input>
			</el-form-item>
			<el-form-item label="备注2" prop="remark_two">
			    <el-input type="textarea" v-model.trim="ruleForm.remark_two"></el-input>
			</el-form-item>
		</el-form>
		<el-row class="m-fix-btn">
			<el-col :span="6" :offset="4">
				<el-button type="primary" @click="save()" class="u-maxwidth-btn">保存</el-button>
			</el-col>
			<el-col :span="6" :offset="6">
				<el-button type="primary" @click="save(true)" class="u-maxwidth-btn">提交</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	const util = require('../../../util.js')
	const moment = require('moment')
	export default {
		data() {
			return {
				ruleForm: {
					cust_name: '',
					cust_hot: '',
					source_from: '',
					dealer_code: '',
					dealer_name: '',
					inten_model: '',
					inten_model_remark: '',
					tel: '',
					gender: '',
					source_activity: '',
					get_date: '',
					predict_buy_date: '',
					province: '',
					city: '',
					remark: '',
					remark_one: '',
					remark_two: ''
				},
				disabled: false,	
				isFirst: false,
				rules: {
					cust_name: [
						{required: true, message: '客户姓名不能为空', trigger: 'change'}
					]
				},
				genderMap: {
					man: 0,
					woman: 1
				},
				provinceArr: [
							  "上海市",
							  "云南省",
							  "内蒙自治区",
							  "北京市",
							  "台湾省",
							  "吉林省",
							  "四川省",
							  "天津市",
							  "宁夏自治区",
							  "安徽省",
							  "山东省",
							  "山西省",
							  "广东省",
							  "广西自治区",
							  "新疆自治区",
							  "江苏省",
							  "江西省",
							  "河北省",
							  "河南省",
							  "浙江省",
							  "海南省",
							  "湖北省",
							  "湖南省",
							  "澳门特别行政区",
							  "甘肃省",
							  "福建省",
							  "西藏自治区",
							  "贵州省",
							  "辽宁省",
							  "重庆市",
							  "陕西省",
							  "青海省",
							  "香港特别行政区",
							  "黑龙江省"
							],
				cityArr: {
						  "上海市": [
						    "上海市"
						  ],
						  "云南省": [
						    "临沧市",
						    "丽江市",
						    "保山市",
						    "大理白族自治州",
						    "德宏傣族景颇族自治州",
						    "怒江傈僳族自治州",
						    "文山壮族苗族自治州",
						    "昆明市",
						    "昭通市",
						    "普洱市",
						    "曲靖市",
						    "楚雄彝族自治州",
						    "玉溪市",
						    "红河哈尼族彝族自治州",
						    "西双版纳傣族自治州",
						    "迪庆藏族自治州"
						  ],
						  "内蒙自治区": [
						    "乌兰察布市",
						    "乌海市",
						    "兴安盟",
						    "包头市",
						    "呼伦贝尔市",
						    "呼和浩特市",
						    "巴彦淖尔市",
						    "赤峰市",
						    "通辽市",
						    "鄂尔多斯市",
						    "锡林郭勒盟",
						    "阿拉善盟"
						  ],
						  "北京市": [
						    "北京市"
						  ],
						  "台湾省": [
						    "台湾"
						  ],
						  "吉林省": [
						    "吉林市",
						    "四平市",
						    "延边朝鲜族自治州",
						    "松原市",
						    "白城市",
						    "白山市",
						    "辽源市",
						    "通化市",
						    "长春市"
						  ],
						  "四川省": [
						    "乐山市",
						    "内江市",
						    "凉山彝族自治州",
						    "南充市",
						    "宜宾市",
						    "巴中市",
						    "广元市",
						    "广安市",
						    "德阳市",
						    "成都市",
						    "攀枝花市",
						    "泸州市",
						    "甘孜藏族自治州",
						    "眉山市",
						    "绵阳市",
						    "自贡市",
						    "资阳市",
						    "达州市",
						    "遂宁市",
						    "阿坝藏族羌族自治州",
						    "雅安市"
						  ],
						  "天津市": [
						    "天津市"
						  ],
						  "宁夏自治区": [
						    "中卫市",
						    "吴忠市",
						    "固原市",
						    "石嘴山市",
						    "银川市"
						  ],
						  "安徽省": [
						    "亳州市",
						    "六安市",
						    "合肥市",
						    "安庆市",
						    "宣城市",
						    "宿州市",
						    "池州市",
						    "淮北市",
						    "淮南市",
						    "滁州市",
						    "芜湖市",
						    "蚌埠市",
						    "铜陵市",
						    "阜阳市",
						    "马鞍山市",
						    "黄山市"
						  ],
						  "山东省": [
						    "东营市",
						    "临沂市",
						    "威海市",
						    "德州市",
						    "日照市",
						    "枣庄市",
						    "泰安市",
						    "济南市",
						    "济宁市",
						    "淄博市",
						    "滨州市",
						    "潍坊市",
						    "烟台市",
						    "聊城市",
						    "莱芜市",
						    "菏泽市",
						    "青岛市"
						  ],
						  "山西省": [
						    "临汾市",
						    "吕梁市",
						    "大同市",
						    "太原市",
						    "忻州市",
						    "晋中市",
						    "晋城市",
						    "朔州市",
						    "运城市",
						    "长治市",
						    "阳泉市"
						  ],
						  "广东省": [
						    "东莞市",
						    "中山市",
						    "云浮市",
						    "佛山市",
						    "广州市",
						    "惠州市",
						    "揭阳市",
						    "梅州市",
						    "汕头市",
						    "汕尾市",
						    "江门市",
						    "河源市",
						    "深圳市",
						    "清远市",
						    "湛江市",
						    "潮州市",
						    "珠海市",
						    "肇庆市",
						    "茂名市",
						    "阳江市",
						    "韶关市"
						  ],
						  "广西自治区": [
						    "北海市",
						    "南宁市",
						    "崇左市",
						    "来宾市",
						    "柳州市",
						    "桂林市",
						    "梧州市",
						    "河池市",
						    "玉林市",
						    "百色市",
						    "贵港市",
						    "贺州市",
						    "钦州市",
						    "防城港市"
						  ],
						  "新疆自治区": [
						    "乌鲁木齐市",
						    "五家渠市",
						    "伊犁哈萨克自治州",
						    "克孜勒苏柯尔克孜自治州",
						    "克拉玛依市",
						    "北屯市",
						    "博尔塔拉蒙古自治州",
						    "双河市",
						    "可克达拉市",
						    "吐鲁番市",
						    "和田地区",
						    "哈密地区",
						    "喀什地区",
						    "图木舒克市",
						    "塔城地区",
						    "巴音郭楞蒙古自治州",
						    "昌吉回族自治州",
						    "石河子市",
						    "铁门关市",
						    "阿克苏地区",
						    "阿勒泰地区",
						    "阿拉尔市"
						  ],
						  "江苏省": [
						    "南京市",
						    "南通市",
						    "宿迁市",
						    "常州市",
						    "徐州市",
						    "扬州市",
						    "无锡市",
						    "泰州市",
						    "淮安市",
						    "盐城市",
						    "苏州市",
						    "连云港市",
						    "镇江市"
						  ],
						  "江西省": [
						    "上饶市",
						    "九江市",
						    "南昌市",
						    "吉安市",
						    "宜春市",
						    "抚州市",
						    "新余市",
						    "景德镇市",
						    "萍乡市",
						    "赣州市",
						    "鹰潭市"
						  ],
						  "河北省": [
						    "保定市",
						    "唐山市",
						    "廊坊市",
						    "张家口市",
						    "承德市",
						    "沧州市",
						    "石家庄市",
						    "秦皇岛市",
						    "衡水市",
						    "邢台市",
						    "邯郸市"
						  ],
						  "河南省": [
						    "三门峡市",
						    "信阳市",
						    "南阳市",
						    "周口市",
						    "商丘市",
						    "安阳市",
						    "平顶山市",
						    "开封市",
						    "新乡市",
						    "洛阳市",
						    "济源市",
						    "漯河市",
						    "濮阳市",
						    "焦作市",
						    "许昌市",
						    "郑州市",
						    "驻马店市",
						    "鹤壁市"
						  ],
						  "浙江省": [
						    "丽水市",
						    "台州市",
						    "嘉兴市",
						    "宁波市",
						    "杭州市",
						    "温州市",
						    "湖州市",
						    "绍兴市",
						    "舟山市",
						    "衢州市",
						    "金华市"
						  ],
						  "海南省": [
						    "万宁市",
						    "三亚市",
						    "三沙市",
						    "东方市",
						    "临高县",
						    "乐东黎族自治县",
						    "五指山市",
						    "保亭黎族苗族自治县",
						    "儋州市",
						    "定安县",
						    "屯昌县",
						    "文昌市",
						    "昌江黎族自治县",
						    "海口市",
						    "澄迈县",
						    "琼中黎族苗族自治县",
						    "琼海市",
						    "白沙黎族自治县",
						    "陵水黎族自治县"
						  ],
						  "湖北省": [
						    "仙桃市",
						    "十堰市",
						    "咸宁市",
						    "天门市",
						    "孝感市",
						    "宜昌市",
						    "恩施土家族苗族自治州",
						    "武汉市",
						    "潜江市",
						    "神农架林区",
						    "荆州市",
						    "荆门市",
						    "襄阳市",
						    "鄂州市",
						    "随州市",
						    "黄冈市",
						    "黄石市"
						  ],
						  "湖南省": [
						    "娄底市",
						    "岳阳市",
						    "常德市",
						    "张家界市",
						    "怀化市",
						    "株洲市",
						    "永州市",
						    "湘潭市",
						    "湘西土家族苗族自治州",
						    "益阳市",
						    "衡阳市",
						    "邵阳市",
						    "郴州市",
						    "长沙市"
						  ],
						  "澳门特别行政区": [
						    "澳门"
						  ],
						  "甘肃省": [
						    "临夏回族自治州",
						    "兰州市",
						    "嘉峪关市",
						    "天水市",
						    "定西市",
						    "平凉市",
						    "庆阳市",
						    "张掖市",
						    "武威市",
						    "甘南藏族自治州",
						    "白银市",
						    "酒泉市",
						    "金昌市",
						    "陇南市"
						  ],
						  "福建省": [
						    "三明市",
						    "南平市",
						    "厦门市",
						    "宁德市",
						    "泉州市",
						    "漳州市",
						    "福州市",
						    "莆田市",
						    "龙岩市"
						  ],
						  "西藏自治区": [
						    "山南市",
						    "拉萨市",
						    "日喀则市",
						    "昌都市",
						    "林芝市",
						    "那曲地区",
						    "阿里地区"
						  ],
						  "贵州省": [
						    "六盘水市",
						    "安顺市",
						    "毕节市",
						    "贵阳市",
						    "遵义市",
						    "铜仁市",
						    "黔东南苗族侗族自治州",
						    "黔南布依族苗族自治州",
						    "黔西南布依族苗族自治州"
						  ],
						  "辽宁省": [
						    "丹东市",
						    "大连市",
						    "抚顺市",
						    "朝阳市",
						    "本溪市",
						    "沈阳市",
						    "盘锦市",
						    "营口市",
						    "葫芦岛市",
						    "辽阳市",
						    "铁岭市",
						    "锦州市",
						    "阜新市",
						    "鞍山市"
						  ],
						  "重庆市": [
						    "重庆市"
						  ],
						  "陕西省": [
						    "咸阳市",
						    "商洛市",
						    "安康市",
						    "宝鸡市",
						    "延安市",
						    "榆林市",
						    "汉中市",
						    "渭南市",
						    "西安市",
						    "铜川市"
						  ],
						  "青海省": [
						    "果洛藏族自治州",
						    "海东市",
						    "海北藏族自治州",
						    "海南藏族自治州",
						    "海西蒙古族藏族自治州",
						    "玉树藏族自治州",
						    "西宁市",
						    "黄南藏族自治州"
						  ],
						  "香港特别行政区": [
						    "香港"
						  ],
						  "黑龙江省": [
						    "七台河市",
						    "伊春市",
						    "佳木斯市",
						    "双鸭山市",
						    "哈尔滨市",
						    "大兴安岭地区",
						    "大庆市",
						    "牡丹江市",
						    "绥化市",
						    "鸡西市",
						    "鹤岗市",
						    "黑河市",
						    "齐齐哈尔市"
						  ]
						},
				inten_model_options: [
					{"value": "五菱之光","label": "五菱之光"},
					{"value": "五菱荣光","label": "五菱荣光"},
					{"value": "五菱宏光S","label": "五菱宏光S"},
					{"value": "五菱鸿途","label": "五菱鸿途"},
					{"value": "乐驰","label": "乐驰"},
					{"value": "五菱宏光","label": "五菱宏光"},
					{"value": "宝骏630","label": "宝骏630"},
					{"value": "五菱宏光S1","label": "五菱宏光S1"},
					{"value": "宝骏610","label": "宝骏610"},
					{"value": "宝骏730","label": "宝骏730"},
					{"value": "五菱征程","label": "五菱征程"},
					{"value": "五菱荣光V","label": "五菱荣光V"},
					{"value": "宝骏560","label": "宝骏560"},
					{"value": "宝骏330","label": "宝骏330"},
					{"value": "宝骏310","label": "宝骏310"},
					{"value": "五菱之光V","label": "五菱之光V"},
					{"value": "宝骏E100","label": "宝骏E100"},
					{"value": "宝骏510","label": "宝骏510"},
					{"value": "宝骏310W","label": "宝骏310W"},
					{"value": "五菱宏光S3","label": "五菱宏光S3"},
					{"value": "宝骏530","label": "宝骏530"},
					{"value": "宝骏360","label": "宝骏360"}
				],
				inten_model_arr: []

			}
		},
		created: function() {
			this.init();
			if (this.$data.ruleForm.tel) {
				this.getInitInfo();
			}
		},
		filters:{
		  	formatDate: function(value) {
		  		if (!value)  return '';
		  		return moment(value,"YYYYMMDDHHmmss").format('YYYY-MM-DD HH:mm:ss');
		  	}
		},
		methods: {
			init() {
				var urlObj = util.parseQueryString(location.search);
				this.$data.ruleForm.tel = urlObj.tel;
			},
			getInitInfo() {
				var _$$this = this;
				var filter = {
					tel: _$$this.$data.ruleForm.tel || ''
				}
				_$$this.$http.post('/wl2/api/callout/query',filter).then((_ret) => {
					if (_ret.body.code != 200) {
						_$$this.$message({
							showClose: true,
							message: _ret.body.message,
							type: 'error'
						})
					}else{
						// 第一次加载标志位
						_$$this.$data.isFirst = true;
						_.merge(_$$this.$data.ruleForm, _ret.body.result)
						if (_$$this.$data.ruleForm.predict_buy_date) {
							_$$this.$data.ruleForm.predict_buy_date = moment(_$$this.$data.ruleForm.predict_buy_date,"YYYYMMDDHHmmss").format('YYYY-MM-DD');
						}

						// 意向车型格式化
						if (_$$this.$data.ruleForm.inten_model) {
							// 有逗号，可能是新版本多选的形式
							_$$this.$data.inten_model_arr = _$$this.$data.ruleForm.inten_model.split(',');
						}
					}
				}).catch((_err) => {
					console.log(_err);
					_$$this.$message({
						showClose: true,
						message: _err.body.message,
						type: 'error'
					})
				})	
			},
			save(isFromBth) {
				var _$$this = this;
				if (_$$this.$data.isFirst) {
					_$$this.$data.isFirst = false;
					return;
				}
				var filter = {
					predict_buy_date: ''
				}

				// format param
				this.formatParam();

				_.merge(filter, _$$this.$data.ruleForm, true);
				_.forIn(filter, function(value, key){
					if (value && (key == 'predict_buy_date')) {
						filter[key] = moment(new Date(value).getTime()).format('YYYYMMDDHHmmss');
					}
				})

				if (isFromBth) {
					filter.status = 2;
				}else{
					filter.status = 1;
				}

				_$$this.$http.post('/wl2/api/callout/update', filter).then((_ret) => {
						if (_ret.body.code != 200) {
							_$$this.$message({
								showClose: true,
								message: _ret.body.message,
								type: 'error'
							})
						}else{
							this.$message({
								showClose: true,
								message: '提交成功',
								type: 'success'
							})
						}
				}).catch((_err) => {
					_$$this.$message({
						showClose: true,
						message: _err.body.message,
						type: 'error'
					})
				})
			},
			formatProvince() {
				var city = this.$data.city;
				this.$data.provinceArr = _.keys(city);
				this.$forceUpdate();
			},
			changeType(_flag) {
				if (!_flag) {
					this.save();
				}
			},
			changeTypeProvince(_flag) {
				if (!_flag) {
					if (this.$data.ruleForm.province) {
						var province = this.$data.ruleForm.province;
						this.$data.ruleForm.city = this.$data.cityArr[province][0];
					}
				}
			},
			formatParam(){
				if (this.$data.inten_model_arr && this.$data.inten_model_arr.length) {
					this.$data.ruleForm.inten_model = this.$data.inten_model_arr.join(',');
				}
			}
		}
	}
</script>

<style lang="postcss">
	.m-fix-btn{
		position: fixed;
		left: 0px;
		bottom: 0px;
		width: 100%;
		height: 56px;
		background: #eee;
		padding-bottom: 10px;
		padding-top: 10px;
	}
	#app{
		padding-bottom: 56px;
	}
	.u-maxwidth-btn{
		width: 100%;
	}
	.el-select{
		width: 100%;
	}
</style>

























