// pages/social-page/home/home.js
import {
  promisic
} from "../../../miniprogram_npm/lin-ui/utils/util"
const app = getApp()

Component({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    StatusBar: app.globalData.StatusBar,
    // 是否登陆
    logged: app.globalData.logged,
    // 用户信息
    userInfo: app.globalData.userInfo,
    // 识别结果
    detectResult: null,
    // 调用接口是否失败
    isFail: false,
    // 页面是否正在加载
    loading: true
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