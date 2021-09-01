// pages/person/home/home.js

import {
  User
} from "../../../model/user"
import {
  UserDao
} from "../../../modelDao/userDao"
import {
  promisic
} from "../../../miniprogram_npm/lin-ui/utils/util"
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast'

const app = getApp()

Component({
  /**
   * 页面的初始数据
   */
  data: {
    /*
     * 用户信息，里面有：
     * _openid: ""
     * avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/GPLUa1IFLd6uGLX7YNvXhTOGY2XI4bva39yK2d8x5I6yvS2ichoH5YCfE2ibwMvwBC2e99Qc6t2oJicicZknv7NUBA/132"
     * city: "Guangzhou"
     * country: "China"
     * gender: 1
     * language: "zh_CN"
     * nickName: "￼",
     * vipBeginTime: ""
     * vipEndTime: ""
     */
    userInfo: null,
    logged: false, // 是否已经登陆，
    isVip: false,
    hasRefresh: false
  },
  observers: {
    'userInfo': function (userInfo) {
      this.setData({
        isVip: new Date().getTime() < userInfo.vipEndTime
      })
      /*---------------------------------
      * 写入 global data
      ----------------------------------*/
      app.globalData.userInfo = userInfo
      /* -------------------
      * 写入本地缓存
      ----------------------*/
      wx.setStorageSync("userInfo", userInfo)
    },
    'logged': (logged) => {
      app.globalData.logged = logged
      // console.log(app.globalData.logged)
    }
  },
  methods: {
    async onGetUserProfile() {
      const res = await promisic(wx.getUserProfile)({
        desc: "为了使用服务，请您登陆"
      })
      const userInfo = res.userInfo
      /* -------------------
      * console.log(userInfo)
      * avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/GPLUa1IFLd6uGLX7YNvXhTOGY2XI4bva39yK2d8x5I6yvS2ichoH5YCfE2ibwMvwBC2e99Qc6t2oJicicZknv7NUBA/132"
      * city: "Hefei"
      * country: "China"
      * gender: 1
      * language: "en"
      * nickName: "￼"
      * province: "Anhui"
      ------------------- */
      let user = new User()
      user.avatarUrl = userInfo.avatarUrl
      user.city = userInfo.city
      user.country = userInfo.country
      user.gender = userInfo.gender
      user.language = userInfo.language
      user.nickName = userInfo.nickName
      user.province = userInfo.province
      /* -------------------
      * 还缺少以下信息：
      * _id
      * _openid
      * vipBeginTime
      * vipEndTime
      -------------------*/
      const userInfoDetail = await UserDao.selectUser(user)
      user._id = userInfoDetail._id
      user._openid = userInfoDetail._openid
      user.vipBeginTime = userInfoDetail.vipBeginTime
      user.vipEndTime = userInfoDetail.vipEndTime

      /*---------------------------------
      * 结合 observes，写入 global data 和本地缓存
      ----------------------------------*/
      this.setData({
        logged: true,
        userInfo: user
      })
    },
    /**
     * 下拉刷新 
     */
    refresh() {
      //在这里请求数据啥的,最后把 hasRefresh 变成 false
      this.setData({
        hasRefresh: false
      })
    },
    async getOpenid() {
      return UserDao.getOpenId()
    },
    accountSetting() {
      wx.navigateTo({
        url: '/pages/person-page/account/account',
        success: res => {
          // 通过eventChannel向被打开页面传送数据
          //   res.eventChannel.emit('result', {
          //     data: this.data.detectResult.result
          //   })
          //   res.eventChannel.emit('img', {
          //     data: this.data.img
          //   })
          // }
        }
      })
    },
    privacyAgreement() {
      Toast({
        context: this,
        message: '工程师还在秃头赶代码中~'
      })
    },
    newVersionUpdate() {
      Toast({
        context: this,
        message: '已是最新版本~'
      })
    },
    appreciateSupport() {
      Toast({
        context: this,
        message: '非常感谢，暂时还不需要哦~'
      })
    }
  },
  lifetimes: {
    async attached() {
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
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行8
    }
  }
})