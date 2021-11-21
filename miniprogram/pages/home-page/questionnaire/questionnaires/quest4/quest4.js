// pages/home-page/questionnaire/questionnaires/quest4/quest4.js
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
        title:'您认为大学生的心理健康是否应引起重视？',
        items:[
        {value:'要认真对待',name:'要认真对待'},
        {value:'无所谓',name:'无所谓'},
        {value:'根本不用在意',name:'根本不用在意'}]
      },
      {
        title:'目前的压力状况',
        items:[
          {value:'大',name:'大'},
          {value:'一般',name:'一般'},
          {value:'小',name:'小'},
          {value:'无压力',name:'无压力'}]
      },
      {
        title:'压力在您生活中扮演什么角色',
        items:[
          {value:'正面，给学习生活注入了动力',name:'正面，给学习生活注入了动力'},
          {value:'较为正面，在自己调控范围内',name:'较为正面，在自己调控范围内'},
          {value:'负面，感到压抑，影响情绪',name:'负面，感到压抑，影响情绪'},
          {value:'负面，会颓废沮丧，失去信心',name:'负面，会颓废沮丧，失去信心'},{value:'不会影响到自己，不做理会',name:'不会影响到自己，不做理会'}]
      },
      {
        title:'压力来源?',
        items:[
          {value:'学习',name:'学习'},
          {value:'就业',name:'就业'},
          {value:'感情',name:'感情'},
          {value:'家庭',name:'家庭'},
          {value:'人际交往',name:'人际交往'},
          {value:'其他',name:'其他'},]
      },
      {
        title:'遇到压力会想向谁寻求帮助',
        items:[
          {value:'自己解决',name:'自己解决'},
          {value:'朋友',name:'朋友'},
          {value:'家长',name:'家长'},
          {value:'老师',name:'老师'},
          {value:'心理咨询',name:'心理咨询'},]
      },
      {
        title:'若自己解决，释放压力的方法',
        items:[
          {value:'大哭',name:'大哭'},
          {value:'找朋友倾诉',name:'找朋友倾诉'},
          {value:'听音乐',name:'听音乐'},
          {value:'看电影',name:'看电影'},
          {value:'看书',name:'看书'},
          {value:'旅游',name:'旅游'},
          {value:'运动',name:'运动'},
          {value:'其他',name:'其他'}]
      },
      {
        title:'在目前为止的大学生活中，您认为遭受到的最大的挫折是什么',
        items:[
          {value:'学习成绩不理想',name:'学习成绩不理想'},
          {value:'没有脱单（恋爱不成功）',name:'没有脱单（恋爱不成功）'},
          {value:'经济困难',name:'经济困难'},
          {value:'与同学之间相处不融洽',name:'与同学之间相处不融洽'},
          {value:'其他',name:'其他'}]
      },
      {
        title:'您是否满意自己的专业？在专业学习上是否顺利？',
        items:[
          {value:'很满意，就是我第一志愿，学习很顺利，开心',name:'很满意，就是我第一志愿，学习很顺利，开心'},
          {value:'很满意专业，但学习比较困难',name:'很满意专业，但学习比较困难'},
          {value:'基本满意，虽然不是第一志愿，但对专业还是比较喜欢，学习顺利',name:'基本满意，虽然不是第一志愿，但对专业还是比较喜欢，学习顺利'},
          {value:'基本满意，但是在学习上感觉到了困难',name:'基本满意，但是在学习上感觉到了困难'},
          {value:'不满意，因为是被调剂的，不喜欢自己的专业，学起来没动力',name:'不满意，因为是被调剂的，不喜欢自己的专业，学起来没动力'},
          {value:'不满意，但已经在了，只能认真学，学起来还顺利',name:'不满意，但已经在了，只能认真学，学起来还顺利'}]
      },
      {
        title:'对于未来就业，给您压力最大的是',
        items:[
          {value:'不看好自己所学的专业',name:'不看好自己所学的专业'},
          {value:'经济不景气，大学生就业难',name:'经济不景气，大学生就业难'},
          {value:'对于自己的未来没有明确的职业规划',name:'对于自己的未来没有明确的职业规划'},
          {value:'考研、考公、出国、直接工作之间纠结',name:'考研、考公、出国、直接工作之间纠结'},
          {value:'没有思考过相关问题',name:'没有思考过相关问题'}
        ]
      },
      {
        title:'您认为自己与人相处方面?',
        items:[
          {value:'非常好，朋友很多，也有很多知心朋友',name:'非常好，朋友很多，也有很多知心朋友'},
          {value:'有好多朋友，但知心的没几个',name:'有好多朋友，但知心的没几个'},
          {value:'朋友不多，有几个知己就已足够',name:'朋友不多，有几个知己就已足够'},
          {value:'我认为自己不太擅长交友',name:'我认为自己不太擅长交友'},
          {value:'我更喜欢一个人，不喜欢被束缚',name:'我更喜欢一个人，不喜欢被束缚'}]
      },
      {
        title:'您认为心理健康工作者目前最应该加强哪方面的工作？',
        items:[
          {value:'进行心理健康知识宣传',name:'进行心理健康知识宣传'},
          {value:'举行心理健康讲座与咨询',name:'举行心理健康讲座与咨询'},
          {value:'进行心理健康状况调查',name:'进行心理健康状况调查'},
          {value:'深入同学中多与同学沟通',name:'深入同学中多与同学沟通'}]
      },
      {
        title:'您认为大学生最需要辅导项目？',
        items:[
          {value:'在我面临人生重大选择时提供参考意见',name:'在我面临人生重大选择时提供参考意见'},
          {value:'解答一些思想问题',name:'解答一些思想问题'},
          {value:'介绍一些为人处事的经验',name:'介绍一些为人处事的经验'},
          {value:'介绍和开放校内外资源',name:'介绍和开放校内外资源'},
          {value:'在我难以自我控制时给予警醒',name:'在我难以自我控制时给予警醒'}
        ]
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