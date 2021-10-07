// pages/medicine-box/home/home.js
import {
  promisic
} from "../../../miniprogram_npm/lin-ui/utils/util"
import {
  User
} from "../../../model/user"
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast'
import {
  FaceDetectResult
} from "../../../model/faceDetectResult"
import {
  FaceDetectResultDao
} from "../../../modelDao/faceDetectResultDao"

const app = getApp()
let image = ""
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
    isFail: false
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
      const response = await wx.cloud.callFunction({
        name: 'user',
        data: {
          flag: 'select',
          user: user
        }
      })
      const userInfoDetail = response.result
      user._id = userInfoDetail._id
      user._openid = userInfoDetail._openid
      user.vipBeginTime = userInfoDetail.vipBeginTime
      user.vipEndTime = userInfoDetail.vipEndTime

      /*---------------------------------
      * 结合 observes，写入 global data
      ----------------------------------*/
      this.setData({
        logged: true,
        userInfo: user
      })
      /* -------------------
      * 写入本地缓存
      ----------------------*/
      wx.setStorageSync("userInfo", user)
    },
    // 图片选择后触发此事件
    async afterRead(event) {
      wx.showLoading({
        title: '加载中'
      })
      let {
        file
      } = event.detail
      /* -----------------------
      * 上传到云开发存储中,获取 file ID
      -----------------------*/
      const upload_res = await promisic(wx.cloud.uploadFile)({
        cloudPath: `${this.data.userInfo._openid}-${new Date().getTime()}.png`,
        filePath: file.url
      })

      const fileID = upload_res.fileID

      /* -----------------------
      * 将当前的 fileID 和 openID 保存到数据库中,方便用户查看历史记录
      -----------------------*/
      const addImageResult = await promisic(wx.cloud.callFunction)({
        name: 'image',
        data: {
          flag: "add",
          fileId: fileID
        }
      })

      /* ---------------------------------
      * 根据 FIle ID进行人脸检测分析
      ---------------------------------*/
      const recognise_result = await promisic(wx.cloud.callFunction)({
        name: 'face-tencent',
        data: {
          image: fileID
        }
      })
      console.log("=========image detect result=========")
      console.log(recognise_result)
      console.log("======================================")

      // 获得结果之后，无论正确与否，都要停止加载状态
      wx.hideLoading()

      // wx.setStorageSync("recognise_result", recognise_result.result)

      if (recognise_result.errMsg === "cloud.callFunction:ok") {
        // 如果获取到正确结果，跳转到结果页面
        console.log("======pages/medicine-box/home/home.js result==================")
        console.log(recognise_result.result)
        console.log("========================")
        promisic(wx.navigateTo({
          url: '/pages/home-page/result/result',
          success: await
            function (res) {
              // 通过eventChannel向被打开页面传送数据
              res.eventChannel.emit('result', {
                data: recognise_result.result
              })
              res.eventChannel.emit('img', {
                data: file.url
              })
            }
        }))
      } else {
        // 否则，显示失败的提示
        this.setData({
          isFail: true
        })
        wx.showToast(recognise_result.errMsg)
      }
    },
    goToHistory() {
      Toast({
        context: this,
        message: '工程师还在秃头赶代码中~'
      })
    }
  },
  pageLifetimes: {},
  lifetimes: {
    async attached() {
      //如果全局有信息,直接同步过来
      if (app.globalData.logged && app.globalData.userInfo) {
        console.log("pages/medicine-box/home/home.js 全局有信息,同步过来")
        this.setData({
          userInfo: app.globalData.userInfo,
          logged: app.globalData.logged
        })
      } else {
        // console.log("从本地缓存读取信息")
        const res = wx.getStorageInfoSync()
        // console.log("查看本地是否存在userInfo的缓存", res.keys.indexOf('userInfo') === 0)
        if (res.keys.indexOf('userInfo') !== -1) {
          const userInfo = await promisic(wx.getStorage)({
            key: 'userInfo'
          })
          // console.log("获取到userInfo:", userInfo)
          this.setData({
            logged: true,
            userInfo: userInfo.data
          })
        }
      }
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    }
  }
})
