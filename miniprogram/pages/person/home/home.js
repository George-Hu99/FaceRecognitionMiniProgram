// pages/person/home/home.js

import {User} from "../../../model/user"
import {UserDao} from "../../../modelDao/userDao"
import {promisic} from "../../../miniprogram_npm/lin-ui/utils/util"

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
      app.globalData.userInfo = userInfo
      // console.log(app.globalData.userInfo)
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

    accountSetting() {
    },
    privacyAgreement() {
    },
    switchTheme() {
    },
    newVersionUpdate() {
    },
    appreciateSupport() {
    },
    /**
     * 点击获取用户信息，包括头像、用户昵称、地区等信息，但是不包括 openID (弹窗请求用户确认)
     * 这一步不需要请求云函数
     */
    onGetUserInfo: async function (e) {
      // =======================================================获取用户信息=======================================================
      const userInfo = e.detail.userInfo
      this.setData({
        userInfo
      })
      // =======================================================获取OpenID=======================================================
      userInfo._openid = await this.getOpenid()
      // =======================================================注册用户=======================================================
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
  //组件所在页面的生命周期
  pageLifetimes: {
    show() {
      // 页面被展示
      console.log("show")
    },
    hide() {
      // 页面被隐藏
      console.log("hide")
    }
  },
  lifetimes: {
    async attached() {
      //如果全局有信息,直接同步过来
      if (app.globalData.logged && app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          logged: app.globalData.logged
        })
      } else {
        //  全局没有信息,那么就看用户有没有授权,有授权的话,就直接拿到用户信息
        const setting = await promisic(wx.getSetting)({})
        //如果用户之前已经授权过可以获取用户信息
        if (setting.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          const userInfo = await promisic(wx.getUserInfo)({})
          // =======================================================获取OpenID=======================================================
          userInfo._openid = await this.getOpenid()
          // 这里的 userInfo 只包含基本用户信息,不包含 vip 信息,因此下面还需要再次获取一次
          //这里的 medicineBoxList 为默认提示(请先登录),为了防止显示为空影响用户体验,因此后面需要再次获取用户自己真实的药箱列表
          this.setData({
            logged: true,
            userInfo: userInfo
          })
          const user = new User(userInfo)
          //  调用云函数，查询用户,无论查询的时候用户存不存在，都会返回用户信息
          const selectUserResult = await UserDao.selectUser(user)
          this.setData({
            userInfo: selectUserResult
          })
        }
      }
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行8
    }
  }
})
