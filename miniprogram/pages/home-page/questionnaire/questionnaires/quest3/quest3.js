// pages/home-page/questionnaire/questionnaires/quest3/quest3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionList:[
      {
        title:'您的性别？',
        items:[
        {value:'男',name:'男'},
        {value:'女',name:'女'}]
      },
      {
        title:'您所在的年级是',
        items:[
        {value:'大一',name:'大一'},
        {value:'大二',name:'大二'},
        {value:'大三',name:'大三'},
        {value:'大四',name:'大四'}]
      },
      {
        title:'您的所在专业是？',
        items:[
        {value:'工商管理',name:'工商管理'},
        {value:'市场营销',name:'市场营销'},
        {value:'人力资源',name:'人力资源'},
        {value:'电子商务',name:'电子商务'},
        {value:'信息管理',name:'信息管理'}]
      },
      {
        title:'您的所在班级是？',
        items:[
        {value:'1班',name:'1班'},
        {value:'2班',name:'2班'},
        {value:'3班',name:'3班'},
        {value:'4班',name:'4班'},
        {value:'5班',name:'5班'},
        {value:'6班',name:'6班'}]
      },
      {
        title:'您通过一定的途径对网络心理咨询有所了解',
        items:[
        {value:'完全了解',name:'完全了解'},
        {value:'比较了解',name:'比较了解'},
        {value:'一般了解',name:'一般了解'},
        {value:'完全不了解',name:'完全不了解'}]
      },
      {
        title:'上网时，您曾浏览或关注过网络心理咨询的相关信息',
        items:[
          {value:'完全符合',name:'完全符合'},
          {value:'较符合',name:'较符合'},
          {value:'一般',name:'一般'},
          {value:'较不符合',name:'较不符合'},
          {value:'完全不符合',name:'完全不符合'}]
      },
      {
        title:'您所了解哪些网络心理咨询的形式',
        items:[
          {value:'e-mail（包括同时或即时聊天）咨询',name:'e-mail（包括同时或即时聊天）咨询'},
          {value:'网上团体咨询',name:'网上团体咨询'},
          {value:'家庭治疗',name:'家庭治疗'},
          {value:'网上心理健康信息资源',name:'网上心理健康信息资源'}]
      },
      {
        title:'您觉得进行网络心理咨询的最佳时间段是什么时候?',
        items:[
          {value:'0:00-6:00',name:'0:00-6:00'},
          {value:'6:00-12:00',name:'6:00-12:00'},
          {value:'12:00-18:00',name:'12:00-18:00'},
          {value:'18:00-24:00',name:'18:00-24:00'}]
      },
      {
        title:'你愿意接受网络心理咨询这种解决心理问题的方式吗？',
        items:[
          {value:'愿意',name:'愿意'},
          {value:'不愿意',name:'不愿意'},
          {value:'不确定',name:'不确定'}]
      },
      {
        title:'如果你有心理困惑，你愿意进行面对面咨询还是网络心理咨询',
        items:[
          {value:'面对面咨询',name:'面对面咨询'},
          {value:'网络心理咨询',name:'网络心理咨询'},
          {value:'看情况',name:'看情况'}]
      },
      {
        title:'你希望网络心理咨询平台可以解决哪些心理问题',
        items:[
          {value:'学业方面',name:'学业方面'},
          {value:'就业方面',name:'就业方面'},
          {value:'家庭关系',name:'家庭关系'},
          {value:'生理问题',name:'生理问题'},
          {value:'自身情绪问题',name:'自身情绪问题'},
          {value:'适应性问题',name:'适应性问题'},
          {value:'人际交往',name:'人际交往'},
          {value:'其他',name:'其他'}]
      },
      {
        title:'如果你有心理困惑，更愿意进行网络心理咨询的原因是什么',
        items:[
          {value:'在网络上不用填写真实姓名',name:'在网络上不用填写真实姓名'},
          {value:'不用面对面咨询，可以缓解紧张、不自在',name:'不用面对面咨询，可以缓解紧张、不自在'},
          {value:'更愿意与陌生人交谈自己的问题',name:'更愿意与陌生人交谈自己的问题'},
          {value:'网络的开放性、实时性，突破了空间障碍',name:'网络的开放性、实时性，突破了空间障碍'},
          {value:'便于交流敏感话题（如伦理、性...）',name:'便于交流敏感话题（如伦理、性...）'},
          {value:'不会被他人发现，介意外界眼光',name:'不会被他人发现，介意外界眼光'}]
      },
      {
        title:'你认为自己不需要网络心理咨询的原因是什么',
        items:[
          {value:'自己可以解决',name:'自己可以解决'},
          {value:'网络心理咨询不够专业',name:'网络心理咨询不够专业'},
          {value:'不够安全，对咨询师很难信任',name:'不够安全，对咨询师很难信任'},{value:'对咨询效果表示怀疑',name:'对咨询效果表示怀疑'},
          {value:'价格不合理',name:'价格不合理'},
          {value:'其他',name:'其他'},
        ]
      },
      {
        title:'与面对面咨询相比，网络心理咨询的不足有哪些?',
        items:[
          {value:'来访者可能无意识隐瞒某些真实信息',name:'来访者可能无意识隐瞒某些真实信息'},
          {value:'咨询方法和技巧效果不如面对面咨询好',name:'咨询方法和技巧效果不如面对面咨询好'},
          {value:'没有面对面咨询正式，比较随意',name:'没有面对面咨询正式，比较随意'},
          {value:'咨询师不容易被人相信',name:'咨询师不容易被人相信'},
          {value:'咨询模式发展不完善',name:'咨询模式发展不完善'},
          {value:'不便于专业心理检查和心理测验',name:'不便于专业心理检查和心理测验'},
          {value:'来访者可能无意识隐瞒某些真实信息',name:'来访者可能无意识隐瞒某些真实信息'},
          {value:'忽视来访者的非言语信息（行为、表情、情绪等）',name:'忽视来访者的非言语信息（行为、表情、情绪等）'},
          {value:'可能会泄露个人信息',name:'可能会泄露个人信息'},
          {value:'无法确认网站的权威性',name:'无法确认网站的权威性'},
          {value:'对咨询效果产生怀疑',name:'对咨询效果产生怀疑'},
          {value:'很难与咨询师建立信任',name:'很难与咨询师建立信任'},
          {value:'不能做到及时回复',name:'不能做到及时回复'}]
      },
      {
        title:'你对于网络咨询的态度是什么',
        items:[
          {value:'无所谓',name:'无所谓'},
          {value:'没有什么用处',name:'没有什么用处'},
          {value:'能够帮助别人解决问题',name:'能够帮助别人解决问题'},
          {value:'比较支持',name:'比较支持'}]
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})