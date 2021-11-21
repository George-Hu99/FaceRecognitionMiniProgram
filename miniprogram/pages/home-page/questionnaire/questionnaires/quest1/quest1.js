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
        title:'您对大学恋爱的态度是？',
        items:[
        {value:'支持',name:'支持'},
        {value:'反对',name:'反对'},
        {value:'无所谓',name:'无所谓'}]
      },
      {
        title:'您现在的恋爱状态是？',
        items:[
          {value:'恋爱中',name:'恋爱中'},
          {value:'单身',name:'单身'}]
      },
      {
        title:'是否想在大学谈恋爱？',
        items:[
          {value:'非常想',name:'非常想'},
          {value:'不想',name:'不想'},
          {value:'无所谓',name:'无所谓'}]
      },
      {
        title:'您认为大学期间的恋爱是？',
        items:[
          {value:'一段真挚的感情，是人生不可或缺的宝贵经历',name:'一段真挚的感情，是人生不可或缺的宝贵经历'},
          {value:'顺其自然，不能强求',name:'顺其自然，不能强求'},
          {value:'没概念',name:'没概念'}]
      },
      {
        title:'您认为大学生谈恋爱是必须的吗？',
        items:[
          {value:'必须的，不谈恋爱的大学是不完整的',name:'必须的，不谈恋爱的大学是不完整的'},
          {value:'不是必须的的，大学还是要以学业为重',name:'不是必须的的，大学还是要以学业为重'},
          {value:'顺其自然，有喜欢的就谈，没有就不谈',name:'顺其自然，有喜欢的就谈，没有就不谈'}]
      },
      {
        title:'如果您遇到喜欢的人会去主动追求吗？',
        items:[
          {value:'会大胆地追求',name:'会大胆地追求'},
          {value:'会很含蓄地暗示',name:'会很含蓄地暗示'},
          {value:'觉得不好意思表达，只敢远远地看着',name:'觉得不好意思表达，只敢远远地看着'},
          {value:'不知道该怎么办',name:'不知道该怎么办'},
          {value:'其他',name:'其他'}]
      },
      {
        title:'大学中谈恋爱您会看重对面的哪些方面？',
        items:[
          {value:'长相身材',name:'长相身材'},
          {value:'经济条件',name:'经济条件'},
          {value:'性格',name:'性格'},
          {value:'成绩',name:'成绩'},
          {value:'其他',name:'其他'}]
      },
      {
        title:'您认为大学生恋爱最初的动力是什么',
        items:[
          {value:'看到大家都有男/女朋友，觉得自己没面子，满足虚荣心理',name:'看到大家都有男/女朋友，觉得自己没面子，满足虚荣心理'},
          {value:'弥补内心的空虚，寻找精神寄托',name:'弥补内心的空虚，寻找精神寄托'},
          {value:'对方强烈追求，自己不好意思拒绝',name:'对方强烈追求，自己不好意思拒绝'},
          {value:'彼此被对方的某些优点所吸引',name:'彼此被对方的某些优点所吸引'},
          {value:'满足好奇心',name:'满足好奇心'},
          {value:'其他',name:'其他'}]
      },
      {
        title:'如果您喜欢的人已经有了男/女朋友，您会怎么办呢',
        items:[
          {value:'放弃追求',name:'放弃追求'},
          {value:'大胆的向他/她表明心意',name:'大胆的向他/她表明心意'},
          {value:'默默等待',name:'默默等待'},
          {value:'其他',name:'其他'}]
      },
      {
        title:'您觉得大学生恋爱是否会对学习和生活产生影响？',
        items:[
          {value:'恋爱使学习、生活更有动力',name:'恋爱使学习、生活更有动力'},
          {value:'分散精力，浪费时间，成绩下降',name:'分散精力，浪费时间，成绩下降'},
          {value:'不会产生任何影响',name:'不会产生任何影响'},
          {value:'因人而异',name:'因人而异'}]
      },
      {
        title:'在恋爱中，您是否会尊重家长的意见？',
        items:[
          {value:'尊重家长的意见',name:'尊重家长的意见'},
          {value:'不在乎家长的看法',name:'不在乎家长的看法'},
          {value:'会有选择地听取家长的意见',name:'会有选择地听取家长的意见'},
          {value:'向家长隐瞒自己恋爱的实情',name:'向家长隐瞒自己恋爱的实情'},
          {value:'其他',name:'其他'}]
      },
      {
        title:'您觉得大学生恋爱一定要以结婚为目的吗？',
        items:[
          {value:'是',name:'是'},
          {value:'不是',name:'不是'},
          {value:'不一定',name:'不一定'}]
      },
      {
        title:'谈恋爱后是否会害怕分手？',
        items:[
          {value:'会',name:'会'},
          {value:'不会',name:'不会'},
          {value:'顺其自然',name:'顺其自然'}]
      },
      {
        title:'分手后是否还会与前任保持联系？',
        items:[
          {value:'会，做不成恋人还可以做朋友',name:'会，做不成恋人还可以做朋友'},
          {value:'不会，一个好的前任应该完全消失',name:'不会，一个好的前任应该完全消失'},
          {value:'说不准，依情况而定',name:'说不准，依情况而定'}]
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