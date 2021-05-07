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
      // 存入全局数据
      app.globalData.userInfo = userInfo
      // 存入本地缓存
      wx.setStorage({
        key: "userInfo",
        data: userInfo
      })
    },
    'logged': (logged) => {
      app.globalData.logged = logged
      // console.log(app.globalData.logged)
    }
  },
  methods: {
    refresh() {
      console.log("下拉刷新")
      //在这里请求数据啥的,最后把 hasRefresh 变成 false
      this.setData({
        hasRefresh: false
      })
    },

    async getOpenid() {
      // 调用云函数，获取用户 openID
      const openidRequestResult = await wx.cloud.callFunction({
        name: 'user',
        data: {
          flag: 'login'
        }
      })
      return openidRequestResult.result.openid
    },

    accountSetting() {},
    privacyAgreement() {},
    switchTheme() {},
    newVersionUpdate() {},
    appreciateSupport() {},
    /**
     * 点击获取用户信息，包括头像、用户昵称、地区等信息，但是不包括 openID (弹窗请求用户确认)
     * 这一步不需要请求云函数
     */
    onGetUserProfile: async function () {
      // =======================================================获取用户信息=======================================================
      const userProfile = await promisic(wx.getUserProfile)({
        desc: "仅用于小程序内的展示，不作他用"
      })
      const userInfo = userProfile.userInfo
      this.setData({
        userInfo
      })
      // =======================================================获取OpenID=======================================================
      userInfo._openid = await this.getOpenid()
      // =======================================================注册用户========= ==============================================
      const user = new User(userInfo)
      // console.log("===============")
      // console.log(user)
      // console.log("===============")
      //  调用云函数，注册用户,无论注册的时候用户存不存在，都会返回用户信息
      const addResult = await UserDao.addUser(user)
      // console.log("==============")
      // console.log(addResult)
      // console.log("==============")
      // =======================================================setData=======================================================
      this.setData({
        logged: true,
        userInfo: addResult
      })
    }
  },
  lifetimes: {
    async attached() {
      //如果全局有信息,直接同步过来
      if (app.globalData.logged && app.globalData.userInfo) {
        console.log("全局有信息,同步过来");
        this.setData({
          userInfo: app.globalData.userInfo,
          logged: app.globalData.logged
        })
      } else {
        console.log("从本地缓存读取信息");
        const res = wx.getStorageInfoSync()
        console.log("查看本地是否存在userInfo的缓存", res.keys.indexOf('userInfo') == 0);
        if (res.keys.indexOf('userInfo') != -1) {
          const userInfo = await promisic(wx.getStorage)({
            key: 'userInfo'
          })
          console.log("获取到userInfo", userInfo)
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