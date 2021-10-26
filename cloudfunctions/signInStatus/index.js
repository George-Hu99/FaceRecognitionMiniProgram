// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'wechatcloud-0g0j7gt09d1fd61a'
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  //查询指定签到状态
  return await db.collection('mini-program-signInStatus').where({
    _openid: '', // 填入当前用户 openid
   })
  .get()
}