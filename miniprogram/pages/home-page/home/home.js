// pages/medicine-box/home/home.js
import {promisic} from "../../../miniprogram_npm/lin-ui/utils/util"
import {User} from "../../../model/user"
import {UserDao} from "../../../modelDao/userDao"

const app = getApp()

Component({
  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    logged: app.globalData.logged,
    userInfo: app.globalData.userInfo,
    hasRefresherTriggered: false,
  },
  observers: {
    'logged': (logged) => {
      app.globalData.logged = logged
    },
    'userInfo': (userInfo) => {
      app.globalData.userInfo = userInfo
    }
  },
  methods: {
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
    startRecord(){
      const that = this
      const cameraContext = wx.createCameraContext()
      cameraContext.startRecord({
        success:res=>{
          console.log("开始", res)
          setTimeout(function() {
            cameraContext.stopRecord({
              success(res) {
                console.log("结束", res, res.tempVideoPath)
                that.setData({
                  tempVideoPath: res.tempVideoPath
                })
              }
            })
          }, 6000)
        }
      })
    }
  },
  pageLifetimes: {
    show() {
      // 页面被展示
      console.log("show")
      this.setData({
        hasRefresherTriggered: false
      })
    },
    hide() {
      // 页面被隐藏
      console.log("hide")
    }
  },
  lifetimes: {
    async attached() {
      // 拿用户信息
      if (app.globalData.logged && app.globalData.userInfo) {
        //  如果全局有
        this.setData({
          logged: app.globalData.logged,
          userInfo: app.globalData.userInfo
        })
      } else {
        // 如果全局没有
        const setting = await promisic(wx.getSetting)({})
        //如果用户之前已经授权过可以获取用户信息
        if (setting.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          const userInfo = await promisic(wx.getUserInfo)({})
          // =======================================================获取OpenID=======================================================
          userInfo._openid = await this.getOpenid()
          const user = new User(userInfo)
          //  调用云函数，查询用户,无论查询的时候用户存不存在，都会返回用户信息
          const selectUserResult = await UserDao.selectUser(user)
          this.setData({
            logged: true,
            userInfo: selectUserResult
          })
        } else {
          return
        }
      }
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    }
  }
})
