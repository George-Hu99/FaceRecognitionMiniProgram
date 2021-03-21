//index.js
Page({
  data: {
    PageName: 'home-page',
    showTabbar: true
  },
  NavChange(e) {
    // console.log(e.currentTarget.dataset.cur);
    this.setData({
      PageName: e.currentTarget.dataset.cur
    })
  },
  onShareAppMessage() {
    return {
      title: 'FaceRecognition-识别你的表情',
      imageUrl: '',
      path: '/pages/index/index'
    }
  },
  onLoad() {
  }
})
