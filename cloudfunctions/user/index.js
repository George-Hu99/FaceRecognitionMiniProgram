// 能够在云函数中操作数据库、存储以及调用其他云函数的库
const cloud = require('wx-server-sdk')
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  // env: cloud.DYNAMIC_CURRENT_ENV
  env: 'cloud-environment-01-3bgd91f9ed3'
})
const db = cloud.database()
const userDatabase = db.collection('user')
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  function login() {
    return {
      event,
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      unionid: wxContext.UNIONID,
      env: wxContext.ENV
    }
  }

  async function selectAndAddUser(user) {
    //添加用户之前，先查询用户是否存在
    const selectResult = await userDatabase.where({
      _openid: wxContext.OPENID
    }).get()

    // 如果用户不存在
    if (selectResult.data.length === 0) {
      //添加用户
      const addResult = await userDatabase.add({
        data: {
          _openid: wxContext.OPENID,
          avatarUrl: user.avatarUrl,
          city: user.city,
          country: user.country,
          gender: user.gender,
          language: user.language,
          nickName: user.nickName,
          province: user.province,
          vipBeginTime: new Date().getTime(),
          // 三天体验会员
          vipEndTime: new Date().getTime() + 1000 * 60 * 60 * 24 * 3
        }
      })
      //查找到刚才创建的用户,然后返回给前端
      const selectResult = await userDatabase.doc(addResult._id).get()
      return selectResult.data
    } else {
      //如果用户已经存在,直接返回用户信息
      return selectResult.data[0]
    }
  }

  function deleteUser() {

  }

  function updateUser(user) {

  }
  switch (event.flag) {
    case "login":
      return login()
    case "add":
      return selectAndAddUser(event.user)
    case "delete":
      return deleteUser()
    case "update":
      return updateUser()
    case "select":
      return selectAndAddUser(event.user)
  }
}
