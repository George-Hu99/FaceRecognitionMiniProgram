// pages/home-page/questionnaire/questionnaires/quest1/quest1.js
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
        title:'觉得没有时间休闲，却又无法静心学习',
        items:[
        {value:'从未发生',name:'从未发生'},
        {value:'偶尔发生',name:'偶尔发生'},
        {value:'经常发生',name:'经常发生'}]
      },
      {
        title:'遇到挫折时很容易发脾气。',
        items:[
          {value:'从未发生',name:'从未发生'},
          {value:'偶尔发生',name:'偶尔发生'},
          {value:'经常发生',name:'经常发生'}]
      },
      {
        title:'不能集中精力专心做事。',
        items:[
          {value:'从未发生',name:'从未发生'},
          {value:'偶尔发生',name:'偶尔发生'},
          {value:'经常发生',name:'经常发生'}]
      },
      {
        title:'担心别人对自己学习的评价。',
        items:[
          {value:'从未发生',name:'从未发生'},
          {value:'偶尔发生',name:'偶尔发生'},
          {value:'经常发生',name:'经常发生'}]
      },
      {
        title:'与人交际应酬变得很不起劲。',
        items:[
          {value:'从未发生',name:'从未发生'},
          {value:'偶尔发生',name:'偶尔发生'},
          {value:'经常发生',name:'经常发生'}]
      },
      {
        title:'常觉得吃下的东西像沉积在胃里。',
        items:[
          {value:'从未发生',name:'从未发生'},
          {value:'偶尔发生',name:'偶尔发生'},
          {value:'经常发生',name:'经常发生'}]
      },
      {
        title:'上床后思潮起伏，牵挂很多事情，难以入睡。',
        items:[
          {value:'从未发生',name:'从未发生'},
          {value:'偶尔发生',name:'偶尔发生'},
          {value:'经常发生',name:'经常发生'}]
      },
      {
        title:'需要借助药物/烟酒/零食等抑制不安。',
        items:[
          {value:'从未发生',name:'从未发生'},
          {value:'偶尔发生',name:'偶尔发生'},
          {value:'经常发生',name:'经常发生'}]
      },
      {
        title:'稍有一点不顺心就会生气。',
        items:[
          {value:'从未发生',name:'从未发生'},
          {value:'偶尔发生',name:'偶尔发生'},
          {value:'经常发生',name:'经常发生'}]
      },
      {
        title:'觉得手头工作太多，无法应付。',
        items:[
          {value:'从未发生',name:'从未发生'},
          {value:'偶尔发生',name:'偶尔发生'},
          {value:'经常发生',name:'经常发生'}]
      },
      {
        title:'我觉得闷闷不乐，情绪低沉',
        items:[
          {value:'没有或很少时间',name:'没有或很少时间'},
          {value:'小部分时间',name:'小部分时间'},
          {value:'相当多时间',name:'相当多时间'},
          {value:'绝大部分或全部时间',name:'绝大部分或全部时间'}]
      },
      {
        title:'我一阵阵地哭出来或是想哭',
        items:[
          {value:'没有或很少时间',name:'没有或很少时间'},
          {value:'小部分时间',name:'小部分时间'},
          {value:'相当多时间',name:'相当多时间'},
          {value:'绝大部分或全部时间',name:'绝大部分或全部时间'}]
      },
      {
        title:'我晚上睡眠不好',
        items:[
          {value:'没有或很少时间',name:'没有或很少时间'},
          {value:'小部分时间',name:'小部分时间'},
          {value:'相当多时间',name:'相当多时间'},
          {value:'绝大部分或全部时间',name:'绝大部分或全部时间'}]
      },
      {
        title:'我有便秘的苦恼',
        items:[
          {value:'没有或很少时间',name:'没有或很少时间'},
          {value:'小部分时间',name:'小部分时间'},
          {value:'相当多时间',name:'相当多时间'},
          {value:'绝大部分或全部时间',name:'绝大部分或全部时间'}]
      },
      {
        title:'我无缘无故感到疲乏',
        items:[
          {value:'没有或很少时间',name:'没有或很少时间'},
          {value:'小部分时间',name:'小部分时间'},
          {value:'相当多时间',name:'相当多时间'},
          {value:'绝大部分或全部时间',name:'绝大部分或全部时间'}]
      },
      {
        title:'我觉得经常做的事情并没有困难',
        items:[
          {value:'没有或很少时间',name:'没有或很少时间'},
          {value:'小部分时间',name:'小部分时间'},
          {value:'相当多时间',name:'相当多时间'},
          {value:'绝大部分或全部时间',name:'绝大部分或全部时间'}]
      },
      {
        title:'我觉得不安而平静不下来',
        items:[
          {value:'没有或很少时间',name:'没有或很少时间'},
          {value:'小部分时间',name:'小部分时间'},
          {value:'相当多时间',name:'相当多时间'},
          {value:'绝大部分或全部时间',name:'绝大部分或全部时间'}]
      },
      {
        title:'我觉得自己是个有用的人，有人需要我',
        items:[
          {value:'没有或很少时间',name:'没有或很少时间'},
          {value:'小部分时间',name:'小部分时间'},
          {value:'相当多时间',name:'相当多时间'},
          {value:'绝大部分或全部时间',name:'绝大部分或全部时间'}]
      },
      {
        title:'我的生活过得很有意思',
        items:[
          {value:'没有或很少时间',name:'没有或很少时间'},
          {value:'小部分时间',name:'小部分时间'},
          {value:'相当多时间',name:'相当多时间'},
          {value:'绝大部分或全部时间',name:'绝大部分或全部时间'}]
      },
      {
        title:'平常感兴趣的事我仍然照样感兴趣',
        items:[
          {value:'没有或很少时间',name:'没有或很少时间'},
          {value:'小部分时间',name:'小部分时间'},
          {value:'相当多时间',name:'相当多时间'},
          {value:'绝大部分或全部时间',name:'绝大部分或全部时间'}]
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