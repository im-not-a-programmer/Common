const api = {
    signIn: { //登录
        type: 'get',
        url: '/xygxjj/login',
        params: {
            uname: '',
            upassword: ''
        }
    },
    verCode: { //获取短信
        type: 'get',
        url: '/xygxjj/verCode',
        params: {
            phoneNo: ''
        }
    },
    register: { //注册
        type: 'get',
        url: '/xygxjj/register',
        params: {
            phoneNo: '',
            uname: '',
            upassword: '',
            userReferralCode: '',
            verCode: ''
        }
    },
    MemberDetailInfo: { //会员详细信息
        type: 'get',
        url: '/xygxjj/getMemberDetailInfo',
        params: {
            uname: ''
        }
    },
    startAndStopMember: { //启用停用会员
        type: 'get',
        url: '/xygxjj/startAndStopMember',
        params: {
            id: '',
            isEnabled: ''
        }
    },
    updatePwd: { //修改密码
        type: 'get',
        url: '/xygxjj/modifyPwd',
        params: {
            id: '',
            upass: '',
            newPwd: ''
        }
    },
    updateTradePwd: { //修改交易密码
        type: 'get',
        url: '/xygxjj/updateTradePwd',
        params: {
            id: '',
            tradePass: '',
            newTradePwd: ''
        }
    },
    findPwdByPh: { //找回密码
        type: 'get',
        url: '/xygxjj/findPwdByPh',
        params: {
            phoneNo: '',
            newPwdByPh: '',
            verCode: ''
        }
    },
    updateidCardNo: { //实名认证
        type: 'get',
        url: '/xygxjj/updateidCardNo',
        params: {
            phoneNo: '',
            fullName: '',
            idCardNo: ''
        }
    },
    myAccumulateAmount: { //我的资产
        type: 'get',
        url: '/xygxjj//myAccumulateAmount',
        params: {
            id: ''
        }
    },
    bindPhoneNo: { //更换手机
        type: 'get',
        url: '/xygxjj/bindPhoneNo',
        params: {
            NewphoneNo: '',
            uid: '',
            verCode: '',
            type: ''
        }
    },
    insertBankCard: { //添加银行卡
        type: 'get',
        url: '/xygxjj/newAddBankCard',
        params: {
            userId: '',
            bankCardNo: '',
            bankName: '',
            bankAccountName: '',
            bankLocation: ''
        }
    },
    settingDefaultOption: { //设置银行卡默认
        type: 'get',
        url: '/xygxjj/settingDefaultOption',
        params: {
            userId: '',
            id: ''
        }
    },
    getAllBankCard: { //根据会员ID查看银行卡详细信息
        type: 'get',
        url: '/xygxjj/getAllBankCard',
        params: {
            userId: ''
        }
    },
    getMemberBankCardDetailInfo: { //根据银行卡ID查看银行卡详细信息
        type: 'get',
        url: '/xygxjj/getMemberBankCardDetailInfo',
        params: {
            userId: '',
            id: ''
        }
    },
    getAllInform: { //根据会员ID查看公告详情
        type: 'get',
        url: '/xygxjj/getAllInform',
        params: {
            userId: ''
        }
    },
    getInform: { //根据公告ID公告详情
        type: 'get',
        url: '/xygxjj/getInform',
        params: {
            id: ''
        }
    },
    getWithdrawCashRecord: { //根据会员ID查询提现记录
        type: 'get',
        url: '/xygxjj/getWithdrawCashRecord',
        params: {
            userId: '',
            uname: ''
        }
    },
    getMemberTradeRecord: { //根据会员ID查询交易记录
        type: 'get',
        url: '/xygxjj/getMemberTradeRecord',
        params: {
            userId: ''
        }
    },
    getProfitShareRecordOfMember: { //利润分享
        type: 'get',
        url: '/xygxjj/getProfitShareRecordOfMember',
        params: {
            userId: ''
        }
    },
    myAccumulateAmount: { //根据会员姓名获取累计总资产
        type: 'get',
        url: '/xygxjj/myAccumulateAmount',
        params: {
            uname: ''
        }
    },
    withdrawCash: { //提现
        type: 'get',
        url: '/xygxjj/withdrawCash',
        params: {
            uname: '',
            tradePass: '',
            withdrawCash: '',
            bankName: '',
            bankCardNo: ''
        }
    },
    getAccountOfMember: { //查看余额
        type: 'get',
        url: '/xygxjj/getAccountOfMember',
        params: {
            userId: ''
        }
    },
    myPromoteRelation: { //我的推广关系
        type: 'get',
        url: '/xygxjj/myPromoteRelation',
        params: {
            id: '',
            uname: ''
        }
    },
    addPromoteRelation: { //添加推广关系
        type: 'get',
        url: '/xygxjj/addPromoteRelation',
        params: {
            id: '',
            uname: '',
            refereeCode: ''
        }
    },
    getAreaList: { //省
        type: 'get',
        url: '/xygxjj/getProvinceOfArea',
        params: {}
    },
    getAreaDetails: { //区域辖区
        type: 'get',
        url: '/xygxjj/getDistrictAreaList',
        params: {
            parentId: ''
        }
    },
    getMemberList: { //代理商
        type: 'get',
        url: '/xygxjj/getMemberList',
        params: {
            uname: '',
            level: ''
        }
    },
    newAddEstateOrder: { //房产合同
        type: 'get',
        url: '/xygxjj/newAddEstateOrder',
        params: {
            EstateOrderForm: '(房产订单)'
        }
    },
    fromRegularToPromoteMember: { //成为推广会员
        type: 'get',
        url: '/xygxjj/fromRegularToPromoteMember',
        params: {
            id: '',
            uname: '',
            payFee: '1000块'
        }
    },
    memberNewTradePass: { //新增交易密码：
        type: 'get',
        url: '/xygxjj/memberNewTradePass',
        params: {
            id: '',
            uname: '',
            tradePass: ''
        }
    },
    getBankList: { //获取所有银行
        type: 'get',
        url: '/xygxjj/getBankList',
        params: {}
    }
};

function apis(Vue) {
    if (apis.installed) {
        return
    }
    apis.installed = true;
    Vue.prototype.$api = api;
};
export default apis;