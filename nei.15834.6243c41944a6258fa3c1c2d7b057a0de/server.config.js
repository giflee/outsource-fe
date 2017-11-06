/*
 * config file for nei server command
 * @author 
 * Auto build by NEI Builder
 */
var path = require('path');
module.exports = {
    /* 根目录 */
    webRoot: '',
    /* 视图目录 */
    viewRoot: '',
    /* 路由 */
    routes: {
      //"ALL /api/*": "代理所有接口, 这里输入代理服务器地址",
      "GET supervisor/api/statistics/sessionNums": { path: 'get/supervisor/api/statistics/sessionNums/data', id: 13566, group: '默认分组' },
      "GET /worksheet/api/transmit/list": { path: 'get/worksheet/api/transmit/list/data', id: 13954, group: '默认分组' },
      "GET /worksheet/api/submit/list": { path: 'get/worksheet/api/submit/list/data', id: 13953, group: '默认分组' },
      "GET /worksheet/api/sheet/user/count": { path: 'get/worksheet/api/sheet/user/count/data', id: 14137, group: '默认分组' },
      "POST /worksheet/api/sheet/transmit": { path: 'post/worksheet/api/sheet/transmit/data', id: 14074, group: '默认分组' },
      "POST /worksheet/api/sheet/search": { path: 'post/worksheet/api/sheet/search/data', id: 13957, group: '默认分组' },
      "POST /worksheet/api/sheet/reply": { path: 'post/worksheet/api/sheet/reply/data', id: 14073, group: '默认分组' },
      "POST /worksheet/api/sheet/modify": { path: 'post/worksheet/api/sheet/modify/data', id: 25597, group: '默认分组' },
      "GET /worksheet/api/sheet/history": { path: 'get/worksheet/api/sheet/history/data', id: 13956, group: '默认分组' },
      "POST /worksheet/api/sheet/handle": { path: 'post/worksheet/api/sheet/handle/data', id: 13973, group: '默认分组' },
      "GET /worksheet/api/sheet/get": { path: 'get/worksheet/api/sheet/get/data', id: 13979, group: '默认分组' },
      "POST /worksheet/api/sheet/finish": { path: 'post/worksheet/api/sheet/finish/data', id: 14075, group: '默认分组' },
      "GET /worksheet/api/sheet/export": { path: 'get/worksheet/api/sheet/export/data', id: 17355, group: '默认分组' },
      "POST /worksheet/api/sheet/badge/reset": { path: 'post/worksheet/api/sheet/badge/reset/data', id: 13981, group: '默认分组' },
      "POST /worksheet/api/sheet/add": { path: 'post/worksheet/api/sheet/add/data', id: 13958, group: '默认分组' },
      "GET /worksheet/api/pool/list": { path: 'get/worksheet/api/pool/list/data', id: 13955, group: '默认分组' },
      "GET /worksheet/api/pending/list": { path: 'get/worksheet/api/pending/list/data', id: 13952, group: '默认分组' },
      "GET /worksheet/api/list/export": { path: 'get/worksheet/api/list/export/data', id: 27950, group: '默认分组' },
      "GET /worksheet/api/list": { path: 'get/worksheet/api/list/data', id: 27947, group: '默认分组' },
      "GET /worksheet/api/filter/list": { path: 'get/worksheet/api/filter/list/data', id: 27948, group: '默认分组' },
      "GET /worksheet/api/count": { path: 'get/worksheet/api/count/data', id: 27949, group: '默认分组' },
      "POST /worksheet/api/category/list/set": { path: 'post/worksheet/api/category/list/set/data', id: 25744, group: '默认分组' },
      "GET /worksheet/api/category/list": { path: 'get/worksheet/api/category/list/data', id: 13961, group: '默认分组' },
      "GET /worksheet/api/badge": { path: 'get/worksheet/api/badge/data', id: 14014, group: '默认分组' },
      "GET /worksheet//api/category/list/get": { path: 'get/worksheet/api/category/list/get/data', id: 25745, group: '默认分组' },
      "POST /webapi/user/evaluate.action": { path: 'post/webapi/user/evaluate.action/data', id: 18111, group: '默认分组' },
      "GET /robot/api/questionCategory/list": { path: 'get/robot/api/questionCategory/list/data', id: 14300, group: '默认分组' },
      "POST /robot/api/questionCategory/edit": { path: 'post/robot/api/questionCategory/edit/data', id: 14302, group: '默认分组' },
      "POST /robot/api/questionCategory/del": { path: 'post/robot/api/questionCategory/del/data', id: 14303, group: '默认分组' },
      "POST /robot/api/questionCategory/add": { path: 'post/robot/api/questionCategory/add/data', id: 14301, group: '默认分组' },
      "GET /robot/api/question/list": { path: 'get/robot/api/question/list/data', id: 14299, group: '默认分组' },
      "GET /robot/api/question/get": { path: 'get/robot/api/question/get/data', id: 14343, group: '默认分组' },
      "POST /robot/api/question/edit": { path: 'post/robot/api/question/edit/data', id: 14305, group: '默认分组' },
      "POST /robot/api/question/del": { path: 'post/robot/api/question/del/data', id: 14372, group: '默认分组' },
      "POST /robot/api/question/check": { path: 'post/robot/api/question/check/data', id: 14344, group: '默认分组' },
      "POST /robot/api/question/add": { path: 'post/robot/api/question/add/data', id: 14304, group: '默认分组' },
      "POST /robot/api/issue/relative": { path: 'post/robot/api/issue/relative/data', id: 14307, group: '默认分组' },
      "GET /robot/api/issue/list": { path: 'get/robot/api/issue/list/data', id: 14330, group: '默认分组' },
      "POST /robot/api/issue/ignore": { path: 'post/robot/api/issue/ignore/data', id: 14308, group: '默认分组' },
      "POST /mnst/api/college/userinfo": { path: 'post/mnst/api/college/userinfo/data', id: 22879, group: '默认分组' },
      "GET /api/wx/token": { path: 'get/api/wx/token/data', id: 13624, group: '默认分组' },
      "GET /api/user/workorder/search": { path: 'get/api/user/workorder/search/data', id: 30231, group: '默认分组' },
      "POST /api/user/update": { path: 'post/api/user/update/data', id: 13159, group: '默认分组' },
      "GET /api/user/search": { path: 'get/api/user/search/data', id: 30229, group: '默认分组' },
      "GET /api/statistics/staffResolved": { path: 'get/api/statistics/staffResolved/data', id: 13646, group: '默认分组' },
      "GET /api/statistics/kefuGroup/report": { path: 'get/api/statistics/kefuGroup/report/data', id: 27960, group: '默认分组' },
      "POST /api/sms/code": { path: 'post/api/sms/code/data', id: 15624, group: '默认分组' },
      "GET /api/session/user": { path: 'get/api/session/user/data', id: 13235, group: '默认分组' },
      "POST /api/session/update": { path: 'post/api/session/update/data', id: 13160, group: '默认分组' },
      "GET /api/session/online": { path: 'get/api/session/online/data', id: 13132, group: '默认分组' },
      "POST /api/session/invite/save": { path: 'post/api/session/invite/save/data', id: 14084, group: '默认分组' },
      "GET /api/session/invite/get": { path: 'get/api/session/invite/get/data', id: 14083, group: '默认分组' },
      "GET /api/session/history": { path: 'get/api/session/history/data', id: 13136, group: '默认分组' },
      "POST /api/session/getMulti": { path: 'post/api/session/getMulti/data', id: 20719, group: '默认分组' },
      "GET /api/session/get": { path: 'get/api/session/get/data', id: 13175, group: '默认分组' },
      "GET /api/service/search": { path: 'get/api/service/search/data', id: 30149, group: '默认分组' },
      "GET /api/report/kefuList": { path: 'get/api/report/kefuList/data', id: 13420, group: '默认分组' },
      "POST /api/reply/update": { path: 'post/api/reply/update/data', id: 14897, group: '默认分组' },
      "GET /api/reply/list": { path: 'get/api/reply/list/data', id: 14894, group: '默认分组' },
      "POST /api/reply/del": { path: 'post/api/reply/del/data', id: 14895, group: '默认分组' },
      "GET /api/reply/checkExist": { path: 'get/api/reply/checkExist/data', id: 14898, group: '默认分组' },
      "POST /api/reply/category/update": { path: 'post/api/reply/category/update/data', id: 14891, group: '默认分组' },
      "GET /api/reply/category/list": { path: 'get/api/reply/category/list/data', id: 14892, group: '默认分组' },
      "POST /api/reply/category/del": { path: 'post/api/reply/category/del/data', id: 14889, group: '默认分组' },
      "POST /api/reply/category/add": { path: 'post/api/reply/category/add/data', id: 14890, group: '默认分组' },
      "POST /api/reply/add": { path: 'post/api/reply/add/data', id: 14896, group: '默认分组' },
      "POST /api/quality/update": { path: 'post/api/quality/update/data', id: 19321, group: '默认分组' },
      "POST /api/quality/setting/set": { path: 'post/api/quality/setting/set/data', id: 19320, group: '默认分组' },
      "GET /api/quality/setting/get": { path: 'get/api/quality/setting/get/data', id: 19318, group: '默认分组' },
      "POST /api/product/user": { path: 'post/api/product/user/data', id: 13306, group: '默认分组' },
      "GET /api/product/token": { path: 'get/api/product/token/data', id: 13316, group: '默认分组' },
      "POST /api/product/order": { path: 'post/api/product/order/data', id: 13142, group: '默认分组' },
      "GET /api/polling/task": { path: 'get/api/polling/task/data', id: 17277, group: '默认分组' },
      "GET /api/polling": { path: 'get/api/polling/data', id: 13161, group: '默认分组' },
      "GET /api/package/list": { path: 'get/api/package/list/data', id: 14663, group: '默认分组' },
      "POST /api/order/setting/setInfo": { path: 'post/api/order/setting/setInfo/data', id: 21402, group: '默认分组' },
      "GET /api/order/list": { path: 'get/api/order/list/data', id: 14642, group: '默认分组' },
      "POST /api/order/confirm": { path: 'post/api/order/confirm/data', id: 14643, group: '默认分组' },
      "POST /api/order/compose": { path: 'post/api/order/compose/data', id: 14656, group: '默认分组' },
      "GET /api/nos/media": { path: 'get/api/nos/media/data', id: 13654, group: '默认分组' },
      "GET /api/monitor/ignore": { path: 'get/api/monitor/ignore/data', id: 21758, group: '默认分组' },
      "GET /api/message/list": { path: 'get/api/message/list/data', id: 13138, group: '默认分组' },
      "POST /api/lead/add": { path: 'post/api/lead/add/data', id: 30184, group: '默认分组' },
      "GET /api/knowledge/search/count": { path: 'get/api/knowledge/search/count/data', id: 33440, group: '默认分组' },
      "GET /api/knowledge/question/search": { path: 'get/api/knowledge/question/search/data', id: 33189, group: '默认分组' },
      "GET /api/knowledge/question/get": { path: 'get/api/knowledge/question/get/data', id: 33277, group: '默认分组' },
      "GET /api/knowledge/point/get": { path: 'get/api/knowledge/point/get/data', id: 33275, group: '默认分组' },
      "POST /api/kefuGroup/updateKefus": { path: 'post/api/kefuGroup/updateKefus/data', id: 14044, group: '默认分组' },
      "POST /api/kefuGroup/update": { path: 'post/api/kefuGroup/update/data', id: 14043, group: '默认分组' },
      "GET /api/kefuGroup/mine": { path: 'get/api/kefuGroup/mine/data', id: 14082, group: '默认分组' },
      "GET /api/kefuGroup/list": { path: 'get/api/kefuGroup/list/data', id: 14046, group: '默认分组' },
      "GET /api/kefuGroup/kefuList": { path: 'get/api/kefuGroup/kefuList/data', id: 13960, group: '默认分组' },
      "POST /api/kefuGroup/deleteKefu": { path: 'post/api/kefuGroup/deleteKefu/data', id: 14052, group: '默认分组' },
      "POST /api/kefuGroup/delete": { path: 'post/api/kefuGroup/delete/data', id: 14041, group: '默认分组' },
      "POST /api/kefuGroup/add": { path: 'post/api/kefuGroup/add/data', id: 14039, group: '默认分组' },
      "POST /api/kefu/updateMobile": { path: 'post/api/kefu/updateMobile/data', id: 15651, group: '默认分组' },
      "POST /api/kefu/update": { path: 'post/api/kefu/update/data', id: 13157, group: '默认分组' },
      "POST /api/kefu/status": { path: 'post/api/kefu/status/data', id: 13167, group: '默认分组' },
      "POST /api/kefu/password": { path: 'post/api/kefu/password/data', id: 13166, group: '默认分组' },
      "GET /api/kefu/logout": { path: 'get/api/kefu/logout/data', id: 13165, group: '默认分组' },
      "POST /api/kefu/login": { path: 'post/api/kefu/login/data', id: 13164, group: '默认分组' },
      "GET /api/kefu/list": { path: 'get/api/kefu/list/data', id: 13158, group: '默认分组' },
      "POST /api/kefu/disable": { path: 'post/api/kefu/disable/data', id: 13417, group: '默认分组' },
      "POST /api/kefu/delete": { path: 'post/api/kefu/delete/data', id: 13156, group: '默认分组' },
      "POST /api/kefu/add": { path: 'post/api/kefu/add/data', id: 13155, group: '默认分组' },
      "GET /api/ipcc/statistics/report/seatWorkLoad": { path: 'get/api/ipcc/statistics/report/seatWorkLoad/data', id: 17688, group: '默认分组' },
      "GET /api/ipcc/statistics/report/seatStatus/summary": { path: 'get/api/ipcc/statistics/report/seatStatus/summary/data', id: 17690, group: '默认分组' },
      "GET /api/ipcc/statistics/report/seatStatus/list": { path: 'get/api/ipcc/statistics/report/seatStatus/list/data', id: 17691, group: '默认分组' },
      "GET /api/ipcc/statistics/report/seatStatus/history": { path: 'get/api/ipcc/statistics/report/seatStatus/history/data', id: 17689, group: '默认分组' },
      "GET /api/ipcc/statistics/report/seatEfficiency": { path: 'get/api/ipcc/statistics/report/seatEfficiency/data', id: 17680, group: '默认分组' },
      "GET /api/ipcc/statistics/report/callSummary": { path: 'get/api/ipcc/statistics/report/callSummary/data', id: 17679, group: '默认分组' },
      "GET /api/ipcc/statistics/report/callOutList": { path: 'get/api/ipcc/statistics/report/callOutList/data', id: 17686, group: '默认分组' },
      "GET /api/ipcc/statistics/report/callInList": { path: 'get/api/ipcc/statistics/report/callInList/data', id: 17684, group: '默认分组' },
      "GET /api/ipcc/statistics/export/seatWorkLoad": { path: 'get/api/ipcc/statistics/export/seatWorkLoad/data', id: 17710, group: '默认分组' },
      "GET /api/ipcc/statistics/export/seatEfficiency": { path: 'get/api/ipcc/statistics/export/seatEfficiency/data', id: 17708, group: '默认分组' },
      "GET /api/ipcc/statistics/export/callOutList": { path: 'get/api/ipcc/statistics/export/callOutList/data', id: 17693, group: '默认分组' },
      "GET /api/ipcc/statistics/export/callInList": { path: 'get/api/ipcc/statistics/export/callInList/data', id: 17692, group: '默认分组' },
      "GET /api/facilitator/query": { path: 'get/api/facilitator/query/data', id: 30182, group: '默认分组' },
      "GET /api/export/summaryReport": { path: 'get/api/export/summaryReport/data', id: 13151, group: '默认分组' },
      "GET /api/export/sessList": { path: 'get/api/export/sessList/data', id: 17314, group: '默认分组' },
      "GET /api/export/questionFeedback": { path: 'get/api/export/questionFeedback/data', id: 13152, group: '默认分组' },
      "GET /api/dealer/query": { path: 'get/api/dealer/query/data', id: 30183, group: '默认分组' },
      "POST /api/customer/update": { path: 'post/api/customer/update/data', id: 30144, group: '默认分组' },
      "POST /api/corporation/setting/leaveSetting": { path: 'post/api/corporation/setting/leaveSetting/data', id: 15114, group: '默认分组' },
      "GET /api/corporation/setting/getEvaluation": { path: 'get/api/corporation/setting/getEvaluation/data', id: 14402, group: '默认分组' },
      "POST /api/corporation/setting/evaluationmodel": { path: 'post/api/corporation/setting/evaluationmodel/data', id: 18108, group: '默认分组' },
      "POST /api/corporation/setting/evaluation": { path: 'post/api/corporation/setting/evaluation/data', id: 14400, group: '默认分组' },
      "POST /api/corporation/setting/crm/set": { path: 'post/api/corporation/setting/crm/set/data', id: 18526, group: '默认分组' },
      "GET /api/corporation/setting/crm/get": { path: 'get/api/corporation/setting/crm/get/data', id: 18523, group: '默认分组' },
      "POST /api/corpmsg/saveschedule": { path: 'post/api/corpmsg/saveschedule/data', id: 20101, group: '默认分组' },
      "POST /api/corpmsg/savemsg": { path: 'post/api/corpmsg/savemsg/data', id: 20106, group: '默认分组' },
      "GET /api/corpmsg/getschedulelist": { path: 'get/api/corpmsg/getschedulelist/data', id: 20099, group: '默认分组' },
      "GET /api/corpmsg/getmsglist": { path: 'get/api/corpmsg/getmsglist/data', id: 20105, group: '默认分组' },
      "POST /api/corpmsg/delschedule": { path: 'post/api/corpmsg/delschedule/data', id: 20104, group: '默认分组' },
      "POST /api/corpmsg/delmsg": { path: 'post/api/corpmsg/delmsg/data', id: 20108, group: '默认分组' },
      "POST /api/company/save": { path: 'post/api/company/save/data', id: 14641, group: '默认分组' },
      "GET /api/clew/get": { path: 'get/api/clew/get/data', id: 30147, group: '默认分组' },
      "POST /api/category/update": { path: 'post/api/category/update/data', id: 13183, group: '默认分组' },
      "POST /api/category/list/set": { path: 'post/api/category/list/set/data', id: 23634, group: '默认分组' },
      "GET /api/category/list/get": { path: 'get/api/category/list/get/data', id: 23632, group: '默认分组' },
      "GET /api/category/list": { path: 'get/api/category/list/data', id: 13181, group: '默认分组' },
      "POST /api/category/delete": { path: 'post/api/category/delete/data', id: 13182, group: '默认分组' },
      "POST /api/category/add": { path: 'post/api/category/add/data', id: 13173, group: '默认分组' },
      "POST /api/callcenter/unmonitor": { path: 'post/api/callcenter/unmonitor/data', id: 28119, group: '默认分组' },
      "POST /api/callcenter/tts/save": { path: 'post/api/callcenter/tts/save/data', id: 30166, group: '默认分组' },
      "GET /api/callcenter/tts/list": { path: 'get/api/callcenter/tts/list/data', id: 30163, group: '默认分组' },
      "POST /api/callcenter/tts/delete": { path: 'post/api/callcenter/tts/delete/data', id: 30167, group: '默认分组' },
      "GET /api/callcenter/transfer": { path: 'get/api/callcenter/transfer/data', id: 20714, group: '默认分组' },
      "POST /api/callcenter/sip/set": { path: 'post/api/callcenter/sip/set/data', id: 28408, group: '默认分组' },
      "GET /api/callcenter/sip/list": { path: 'get/api/callcenter/sip/list/data', id: 28455, group: '默认分组' },
      "GET /api/callcenter/sip/get": { path: 'get/api/callcenter/sip/get/data', id: 28409, group: '默认分组' },
      "POST /api/callcenter/settingvoice/set": { path: 'post/api/callcenter/settingvoice/set/data', id: 17659, group: '默认分组' },
      "GET /api/callcenter/settingvoice/get": { path: 'get/api/callcenter/settingvoice/get/data', id: 17658, group: '默认分组' },
      "GET /api/callcenter/session/user": { path: 'get/api/callcenter/session/user/data', id: 17668, group: '默认分组' },
      "POST /api/callcenter/session/unmute": { path: 'post/api/callcenter/session/unmute/data', id: 18561, group: '默认分组' },
      "POST /api/callcenter/session/transfer": { path: 'post/api/callcenter/session/transfer/data', id: 20893, group: '默认分组' },
      "POST /api/callcenter/session/mute": { path: 'post/api/callcenter/session/mute/data', id: 18560, group: '默认分组' },
      "GET /api/callcenter/session/detail": { path: 'get/api/callcenter/session/detail/data', id: 17275, group: '默认分组' },
      "POST /api/callcenter/session/check": { path: 'post/api/callcenter/session/check/data', id: 20905, group: '默认分组' },
      "POST /api/callcenter/outcall": { path: 'post/api/callcenter/outcall/data', id: 17341, group: '默认分组' },
      "POST /api/callcenter/monitor": { path: 'post/api/callcenter/monitor/data', id: 28117, group: '默认分组' },
      "POST /api/callcenter/ivrsetting/set": { path: 'post/api/callcenter/ivrsetting/set/data', id: 17072, group: '默认分组' },
      "GET /api/callcenter/ivrsetting/list": { path: 'get/api/callcenter/ivrsetting/list/data', id: 30393, group: '默认分组' },
      "GET /api/callcenter/ivrsetting/get": { path: 'get/api/callcenter/ivrsetting/get/data', id: 17070, group: '默认分组' },
      "POST /api/callcenter/ivrsetting/del": { path: 'post/api/callcenter/ivrsetting/del/data', id: 30395, group: '默认分组' },
      "GET /api/callcenter/failedCallList": { path: 'get/api/callcenter/failedCallList/data', id: 30157, group: '默认分组' },
      "GET /api/callcenter/costmode": { path: 'get/api/callcenter/costmode/data', id: 17676, group: '默认分组' },
      "GET /api/callcenter/callseat": { path: 'get/api/callcenter/callseat/data', id: 17677, group: '默认分组' },
      "GET /api/callcenter/callcost": { path: 'get/api/callcenter/callcost/data', id: 17666, group: '默认分组' },
      "POST /api/callcenter/callModeSetting/set": { path: 'post/api/callcenter/callModeSetting/set/data', id: 21329, group: '默认分组' },
      "GET /api/callcenter/callModeSetting/get": { path: 'get/api/callcenter/callModeSetting/get/data', id: 21325, group: '默认分组' },
      "GET /api/announce/list": { path: 'get/api/announce/list/data', id: 18449, group: '默认分组' },
    },
    /* 注入给页面的模型数据的服务器配置 */
    // modelServer: {
    //     // 完整的主机地址，包括协议、主机名、端口
    //     host: '',
    //     // 查询参数，键值对
    //     queries: {},
    //     // 自定义请求头，键值对
    //     headers: {},
    //     // path 可以是字符串，也可以是函数；默认不用传，即使用 host + 页面path + queries 的值
    //     // 如果是函数，则使用函数的返回值，传给函数的参数 options 是一个对象，它包含 host、path（页面path）、queries、headers 等参数
    //     // 如果 path 的值为假值，则使用 host + 页面path + queries 的值；
    //     // 如果 path 的值是相对地址，则会在前面加上 host
    //     // path: '',
    // },
    /* api 响应头 */
    apiResHeaders: {
        // 设置可跨域访问时，取消注释以下内容, 并按需要配置
        // 'Access-Control-Allow-Origin': 'http://localhost:8080',
        // 'Access-Control-Allow-Credentials': 'true',
        // 'Access-Control-Allow-Headers': 'Content-Type',
        // 'Access-Control-Allow-Methods': 'GET, POST, HEAD, OPTIONS, PUT, DELETE, PATCH'
    },
    /* 是否自动打开浏览器 */
    launch: true,
    /* 自动打开的页面地址 */
    openUrl: '',
    /* 端口 */
    port: 8002,
    /* 是否使用 https 协议，设为true的时候表示启用 */
    https: false,
    /* 是否使用 nei 提供的在线 mock 数据 */
    online: false,
    /* 是否监听静态文件和模板文件的变化并自动刷新浏览器 */
    reload: true,
    /* 文件监听的选项 */
    watchingFiles: {
        /* 需要即时编译的文件, 前提是 reload 为 true */
        compilers: {
            /* 值为 mcss 的配置选项, 默认为 false，即不编译 mcss 文件 */
            mcss: false
        },
        /* 不用监听的文件，支持通配符 */
        //ignored: '**/*.css'
    },
    /* 项目的 key */
    projectKey: '6243c41944a6258fa3c1c2d7b057a0de',
    /* 同步模块mock数据路径 */
    mockTpl: '',
    /* 异步接口mock数据路径 */
    mockApi: '/Users/jianfulee/Desktop/neteaseWorkspace/outsource-fe/src/mock/',
    /* 模板后缀 */
    viewExt: '.ftl',
    /* 模板引擎 */
    engine: '',
    /* 打开下面的 fmpp 配置，可以在模板中调用自定义 jar 包中的类 */
    //fmpp: {
    //    /* 存放自定义 jar 的目录, 绝对路径 */
    //    jarDir: '',
    //    /* 暴露给模板的类实例名称和 jar 中的类名(带包名)的对应关系 */
    //    jarConfig: {
    //        [暴露给模板的类实例名称]: [类名] // 比如: HighlightUtil: 'yueduutil.HighlightUtil'
    //    }
    //}
};