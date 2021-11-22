import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';
Page({
  data: {
    // 预约时间
    minHour: 0,
    maxHour: 24,
    minDate: new Date().getTime(),
    maxDate: new Date(2022, 12, 31).getTime(),
    currentDate: new Date().getTime(),
    showTime: false,
    startTime: '2021-11-01 10:00',
    lastTime: '2021-11-01 10:00',
    starTag: true,

    // 预约老师
    teacher: '尹刚',
    showTeacher: false,
    columnsTeacher: ['黄龙标', '陈子健', '唐洪婷', '杨兴雨', '尹刚'],
    // 预约地点
    location: '操场',
    showLocation: false,
    columnsLocation: ['操场', '办公室'],
  },

  onShow() {
    this.getTabBar().init();
  },

  onLoad: function () {

  },



  // 预约时间
  openStartTimePopup() {
    this.setData({
      showTime: true,
      starTag: true,
    })
  },
  openLastTimePopup() {
    this.setData({
      showTime: true,
      starTag: false,
    })
  },
  onConfirmTime(e) {
    this.setData({
      showTime: false,
    })
    if (this.data.starTag) {
      this.setData({
        startTime: this.formatDate(new Date(e.detail))
      });
    } else {
      this.setData({
        lastTime: this.formatDate(new Date(e.detail))
      });
    }
  },
  onCloseTimePopup() {
    this.setData({
      showTime: false
    })
  },
  onCancelTimePopup() {
    this.setData({
      showTime: false
    })
  },
  formatDate(date) {
    let taskStartTime
    if (date.getMonth() < 9) {
      taskStartTime = date.getFullYear() + "-0" + (date.getMonth() + 1) + "-"
    } else {
      taskStartTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"
    }
    if (date.getDate() < 10) {
      taskStartTime += "0" + date.getDate()
    } else {
      taskStartTime += date.getDate()
    }
    taskStartTime += " " + date.getHours() + ":" + date.getMinutes()
    this.setData({
      taskStartTime: taskStartTime,
    })
    return taskStartTime;
  },

  // 选择老师
  openTeacherPopup() {
    this.setData({
      showTeacher: true
    })
  },
  onCancelTeacher() {
    this.setData({
      showTeacher: false,
    })
    Toast('取消');
  },
  onConfirmTeacher(event) {
    this.setData({
      showTeacher: false,
      teacher: event.detail.value
    })
  },
  // 选择地点
  openLocationPopup() {
    this.setData({
      showLocation: true
    })
  },
  onCancelLocation() {
    this.setData({
      showLocation: false,
    })
    Toast('取消');
  },
  onConfirmLocation(event) {
    this.setData({
      showLocation: false,
      location: event.detail.value
    })
  },
  consultPage() {
    wx.navigateTo({
      url: "/pages/home-page/consult/consult"
    })
  },
  // 通知
  confirmOrder() {
    // 成功通知
    Notify({
      type: 'success',
      message: '预约成功！'
    });
  }
})