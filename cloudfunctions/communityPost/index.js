// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  //查询指定社区帖子
  return await db.collection('mini-program-signInStatus').where({
    _openid: '', // 填入当前用户 openid
    postId: '' // 填入当前的帖子id
   })
  .get()
}