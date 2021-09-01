// 能够在云函数中操作数据库、存储以及调用其他云函数的库
const cloud = require('wx-server-sdk')
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  // env: cloud.DYNAMIC_CURRENT_ENV
  env: 'wechatcloud-0g0j7gt09d1fd61a'
})
const db = cloud.database()
const userDatabase = db.collection('mini-program-user')
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  async function selectAndAddUser(user) {
    //添加用户之前，先查询用户是否存在
    const selectResult = await userDatabase.where({
      _openid: wxContext.OPENID
    }).get()
    // console.log("==============")
    // console.log(user)
    // console.log("==============")
    // 如果用户不存在
    if (selectResult.data.length === 0) {
      // console.log("用户不存在")
      //添加用户
      const addResult = await userDatabase.add({
        data: {
          _openid: wxContext.OPENID,
          _unionid: wxContext.UNIONID,
          avatarUrl: user._avatarUrl,
          city: user._city,
          country: user._country,
          gender: user._gender,
          language: user._language,
          nickName: user._nickName,
          province: user._province,
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
      console.log("用户已存在")
      return selectResult.data[0]
    }
  }

  async function selectUser(openid) {
    if (openid === "") {
      openid = wxContext.OPENID
    }
    //添加用户之前，先查询用户是否存在
    const selectResult = await userDatabase.where({
      _openid: openid
    }).get()

    // 如果用户不存在
    if (selectResult.data.length === 0) {
      return "用户不存在"
    } else {
      console.log(selectResult.data[0])
      return selectResult.data[0]
    }
  }

  async function deleteUser() {

  }
  /**
   * 更新用户信息
   * @param {JSON} user 
   */
  async function updateUser(user) {
    console.log(user);
    //更新用户之前，先查询用户是否存在
    const selectResult = await userDatabase.where({
      _openid: wxContext.OPENID
    }).get()

    // 如果用户不存在
    if (selectResult.data.length === 0) {
      return "用户不存在"
    } else {
      // console.log(selectResult.data[0])
      try {
        userDatabase.where({
            _openid: wxContext.OPENID,
          })
          .update({
            data: {
              _openid: wxContext.OPENID,
              _unionid: wxContext.UNIONID,
              avatarUrl: user._avatarUrl,
              city: user._city,
              country: user._country,
              gender: user._gender,
              language: user._language,
              nickName: user._nickName,
              province: user._province,
              vipBeginTime: user._vipBeginTime,
              // 三天体验会员
              vipEndTime: user._vipEndTime
            },
          })
      } catch (e) {
        console.log("更新失败");
        console.error(e)
        return "更新数据失败"
      }
      return "OK"
    }
  }

  switch (event.flag) {
    case "select":
      return selectAndAddUser(event.user)
    case "login":
      return selectUser(event.openid)
    case "delete":
      return deleteUser()
    case "update":
      return updateUser(event.user)
  }
}