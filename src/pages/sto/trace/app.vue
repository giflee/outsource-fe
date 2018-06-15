<template>
    <div class="m-trace">
       <header>
            <el-input placeholder="请输入内容" v-model="searchInput" class="txt"></el-input>
            <el-button type="primary" class="btn" :class="{'btn-disabled':!searchInput}" @click="onSearchTrace(!0)">搜索</el-button>
            <p class="error" v-if="!!message">{{message}}</p>
       </header>
       <article class="m-tracelist">
          <p class="warn" v-if="!!warn">{{warn}}</p>
           <ul>
               <li v-for="trace in traces">
                   <p>【{{trace.city}}】
                       {{trace.facilityName}}
                       &nbsp;&nbsp;{{trace.detailDesc}}
                       &nbsp;&nbsp;{{trace.action}}人：{{trace.contacter}}
                        <span v-if="trace.contactPhone">
                            &nbsp;&nbsp;电话：{{trace.contactPhone}}
                        </span>
                        <span v-else>
                        </span>
                    </p>
                    <p v-if="trace.nextNodeName">下一个站点：{{trace.nextNodeName}}</p>
                    <p class="time">{{trace.timeStr}}</p>
               </li>
           </ul>
       </article>
    </div>
</template>

<script>
    const util = require('../../../util.js');
    let _traceCodeArr=null,sessionId;
    const cacheKey="sto_traceCodeCache";
    export default {
        data() {
            return {
                message: "", //错误提示
                warn: "", //无数据提示
                searchInput: '', //工单筛选值
                traces: [], //筛选数据列表
            }
        },
        created: function() {
            let urlObj = util.parseQueryString(location.search);
            let traceCodeArr=[],orderCode,traceCodeCache;
            if(urlObj.sessionId){
                sessionId=urlObj.sessionId;
                traceCodeCache=localStorage.getItem(cacheKey);//格式：[[sessionId,code],[sessionId,code],...]
                if(traceCodeCache){
                    traceCodeArr=JSON.parse(traceCodeCache);
                    _traceCodeArr=traceCodeArr;//记录下来，避免再次解析
                    orderCode=this.getCodeFromCache(sessionId,traceCodeArr);
                    if(orderCode){
                        this.getTraceList(orderCode);
                        this.searchInput=orderCode;
                    }
                }
            }
			
		},
        methods: {
            //根据当前会话ID获取缓存中的运单号，用于自动查询上次输入的单号物流信息
            getCodeFromCache(sessionId,cacheArr){
                for(let v of cacheArr) {
                    if(v[0]==sessionId){
                        return v[1];
                    }
                }
                return "";
            },
            //查询时，把当前运单号和会话ID关联起来存入缓存
            addCodeToCache(sessionId,orderCode){
                let traceCodeArr=[],traceCodeCache;
                if(_traceCodeArr){
                    traceCodeArr=_traceCodeArr;
                }else{
                    traceCodeCache=localStorage.getItem(cacheKey);
                    if(traceCodeCache){
                        traceCodeArr=JSON.parse(traceCodeCache);
                    }else{
                        traceCodeArr=[];
                    }
                }
                var oldIndex=traceCodeArr.findIndex(function(value, index, arr) {
                    return value[0]==sessionId;
                });
                if(oldIndex>=0){
                    traceCodeArr.splice(oldIndex,1);
                }
                if(traceCodeArr.length>=100){
                    traceCodeArr.shift(0);//删除最早的一个缓存记录
                }
                traceCodeArr.push([sessionId,orderCode]);
                _traceCodeArr=traceCodeArr;//记录下来，避免再次解析
                localStorage.setItem(cacheKey,JSON.stringify(traceCodeArr));
            },
            //根据运单号获取物流信息跟踪记录列表
            getTraceList(orderCode){
                this.$http.get('/sto/api/searchTrace', {
                    searchInput: orderCode,
                }).then((json) => {console.log(res);
                    var res=json.body;
                    if (res.responseState<2) {
                        if(res.responseItems&&res.responseItems.length){
                            this.traces = (res.responseItems[0].traces||[]).reverse();
                            if(this.traces.length<1){
                                this.warn="查无快件记录";
                            }
                        }else{
                            this.warn="查无快件记录";
                        }
                    } else {
                        this.message=res.message || '未知错误';
                    }
                }).catch((_err) => {
                    this.message=_err.message || '未知错误';
                })
            },
            /**
             * 物流搜索
             */
            onSearchTrace(reset) {
                this.warn="";
                this.message="";
                var key=this.searchInput;
                key=key.replace(/\W/gi,"");
                if (!key) {
                    this.message = "请输入运单号";return;
                }
                //this.traces=_res.responseItems[0].traces;
                this.getTraceList(key);
                if(sessionId){
                    this.addCodeToCache(sessionId,key);
                }
                
            },
        }

    }
</script>

<style lang="scss">
    body, html {
        margin: 0;
        padding: 0;
        /*min-width: 518px;*/
        font-family: MicrosoftYaHei;
    }
    .m-trace{
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        header{
            height:47px;
            padding:10px;
            display:flex;
            position: relative;
            .txt{width:100%;
                input{
                    border-radius: 4px 0 0 4px;
                }
            }
            .btn{
                height: 36px;
                width:100px;
                border-radius: 0 4px 4px 0;
            }
            .btn-disabled{
                background-color:#999;
                border-color:#999;
                &:hover{
                    background-color:#999;
                }
            }
            .error{
                position:absolute;
                bottom:-20px;
                color:#f00;
                font-size: 12px;
            }
        }
    }
    .m-tracelist{
        overflow:auto;
        ul{
            margin:12px;
            border-left:solid 2px #ccc;
            li{
                font-size:16px;
                margin-left:-26px;
                list-style-type:disc;
                color:#999;
                position: relative;
                padding-bottom:5px;
                p{  
                    padding:0;
                    margin:0;
                    line-height:20px;
                    font-size:12px;
                    color:#666;
                    &.time{
                        color:#aaa;
                    }
                }
            }
        }
        .warn{
            text-align:center;
            color:#333;
            font-size:14px;
            line-height:100px;
        }
    }
</style>
