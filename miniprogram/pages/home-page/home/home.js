// pages/medicine-box/home/home.js
import {
  promisic
} from "../../../miniprogram_npm/lin-ui/utils/util"

const app = getApp();
var image = "";
Component({
  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    StatusBar: app.globalData.StatusBar,
    logged: app.globalData.logged,
    userInfo: app.globalData.userInfo,
    hasRefresherTriggered: false,
    showBtn: false,
    uploading: false,
    img: "",
    detectResult: null
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

    // 图片选择后触发此事件
    async onChangeTap(event) {
      // 用户选择图片之后,显示上传按钮
      this.setData({
        showBtn: true
      })

      var img = event.detail.current[0]
      this.setData({
        img
      })
      console.log("==========压缩前============");
      console.log(img)
      console.log("======================");

      // 压缩图片, 提高性能
      // 注意,这里不压缩的话,会引起超时
      img = await promisic(wx.compressImage)({
        src: img, // 图片路径
        quality: 25 // 压缩质量
      })

      console.log("==========压缩后============");
      console.log(img.tempFilePath)
      console.log("======================");
      // 把图片转为 BASE64 编码
      const FSM = wx.getFileSystemManager();
      image = await promisic(FSM.readFile)({
        filePath: img.tempFilePath,
        encoding: "base64",
      })
    },


    // 点击上传按钮后触发此事件
    async uploadImg() {
      // 禁用按钮、设置为加载状态
      this.setData({
        uploading: true
      })

      // 调用人脸识别接口，上传 BASE64 字符串。
      // 为了防止 BASE64 太大导致超时，这里使用 CDN 
      const result = await promisic(wx.cloud.callFunction)({
        name: 'face',
        data: {
          image: wx.cloud.CDN(image.data)
        }
      })

      // 获得结果之后，无论正确与否，都要让按钮恢复可点击状态
      this.setData({
        uploading: false,
        detectResult: JSON.parse(result.result)
      })

      if (this.data.detectResult.error_code == 0) {
        // 如果获取到正确结果，跳转到结果页面
        wx.navigateTo({
          url: '/pages/home-page/result/result',
          success: res => {
            // 通过eventChannel向被打开页面传送数据
            res.eventChannel.emit('result', {
              data: this.data.detectResult.result
            })
            res.eventChannel.emit('img', {
              data: this.data.img
            })
          }
        })
      } else {
        // 否则，显示失败的提示
        this.setData({
          isFail: true
        })
      }
    }
  },
  pageLifetimes: {},
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
      // 在组件实例被从页面节点树移除时执行
    }
  }
})