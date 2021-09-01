// pages/person-page/account/account.js
import {
  promisic
} from "../../../miniprogram_npm/lin-ui/utils/util"
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast'
import {
  UserDao
} from "../../../modelDao/userDao"

const app = getApp()
Component({
  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    StatusBar: app.globalData.StatusBar,
    logged: false,
    userInfo: null,
    showChangeGender: false,
    actions: [{
        name: '男',
        color: '#000000'
      },
      {
        name: '女',
        color: '#000000'
      }
    ]
  },
  observers: {
    'userInfo': function (userInfo) {
      /*---------------------------------
      * 写入 global data
      ----------------------------------*/
      app.globalData.userInfo = userInfo
      /* -------------------
      * 写入本地缓存
      ----------------------*/
      wx.setStorageSync("userInfo", userInfo)
    }
  },
  methods: {
    changeGenderShowStatus() {
      this.setData({
        showChangeGender: true
      })
    },
    closeChangeGender() {
      this.setData({
        showChangeGender: false
      })
    },
    async changeGender(res) {
      const that = this
      if (res.detail.name.search("当前.*") === -1) {
        let user = that.data.userInfo
        user._gender = 1 - user._gender
        const res = await UserDao.updateUser(user)
        if (res === "OK") {
          Toast('修改成功')
          that.setData({
            userInfo: user
          })
        } else {
          Toast('修改失败，请稍后再试')
        }
      }
    },
    copyOpenID(res) {
      console.log(res)
      promisic(wx.setClipboardData)({
        data: 'data'
      })
    },
    goToVip() {
      Toast({
        context: this,
        message: '工程师还在秃头赶代码中~'
      })
      // wx.navigateTo({
      // url: '/pages/person-page/account/vip/vip',
      // success: res => {
      // 通过eventChannel向被打开页面传送数据
      //   res.eventChannel.emit('result', {
      //     data: this.data.detectResult.result
      //   })
      //   res.eventChannel.emit('img', {
      //     data: this.data.img
      //   })
      // }
      // }
      // })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        //如果全局有信息,直接同步过来
        if (app.globalData.logged && app.globalData.userInfo) {
          console.log("全局有信息,同步过来")
          this.setData({
            userInfo: app.globalData.userInfo,
            logged: app.globalData.logged
          })
        } else {
          // console.log("从本地缓存读取信息")
          const res = wx.getStorageInfoSync()
          console.log("查看本地是否存在userInfo的缓存", res.keys.indexOf('userInfo') === 0)
          if (res.keys.indexOf('userInfo') !== -1) {
            const userInfo = await promisic(wx.getStorage)({
              key: 'userInfo'
            })
            // console.log("获取到userInfo", userInfo)
            this.setData({
              logged: true,
              userInfo: userInfo.data
            })
          }
        }
        /*
         * 展示性别颜色
         */
        if (this.data.userInfo != null) {
          console.log(this.data.userInfo)
          let actions = this.data.actions
          if (this.data.userInfo._gender === 1) {
            actions[0].name = '当前：男'
            actions[0].color = '#06C05F'
          } else {
            actions[1].name = '当前：女'
            actions[1].color = '#06C05F'
          }
          this.setData({
            actions
          })
        }
      }

      ,

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
  }
})