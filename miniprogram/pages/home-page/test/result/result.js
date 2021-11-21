// pages/home-page/result/result.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    StatusBar: app.globalData.StatusBar,
    logged: app.globalData.logged,
    userInfo: app.globalData.userInfo,
    current_image_url: "",
    detectResult: null,
    emotionType: {
      0: "自然",
      1: "高兴",
      2: "惊讶",
      3: "生气",
      4: "悲伤",
      5: "厌恶",
      6: "害怕"
    },
    glassType: {
      0: "无眼镜",
      1: "普通眼镜",
      2: "墨镜"
    },
    eyeSize: {
      0: "小眼睛",
      1: "普通眼睛",
      2: "大眼睛"
    },
    hairLength: {
      0: "光头",
      1: "短发",
      2: "中发",
      3: "长发",
      4: "绑发"
    },
    hairColor: {
      0: "黑色",
      1: "金色",
      2: "棕色",
      3: "灰白色"
    },
    hatStyle: {
      0: "不戴帽子",
      1: "普通帽子",
      2: "头盔",
      3: "保安帽"
    },
    hatColor: {
      0: "不戴帽子",
      1: "红色系",
      2: "黄色系",
      3: "蓝色系",
      4: "黑色系",
      5: "灰白色系",
      6: "混色系子"
    },
    noseType: {
      0: "朝天鼻",
      1: "鹰钩鼻",
      2: "普通",
      3: "圆鼻头"
    },
    faceShape: {
      0: "方脸",
      1: "三角脸",
      2: "鹅蛋脸",
      3: "心形脸",
      4: "圆脸"
    },
    skinType: {
      0: "黄色皮肤",
      1: "棕色皮肤",
      2: "黑色皮肤",
      3: "白色皮肤"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('result', data => {
      console.log("====pages/home-page/result/result.js data.data===========")
      console.log(data.data)
      console.log("===============")
      this.setData({
        detectResult: (data.data.FaceDetailInfos[0])
      })
    })
    eventChannel.on('img', data => {
      this.setData({
        current_image_url: data.data
      })
    })

    /*    const recognise_result = wx.getStorageSync("recognise_result")
        console.log(recognise_result)
        this.setData({
          detectResult: (recognise_result.FaceDetailInfos[0])
        })
        console.log(this.data.detectResult)*/
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