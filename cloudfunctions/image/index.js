// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  // env: cloud.DYNAMIC_CURRENT_ENV
  env: 'wechatcloud-0g0j7gt09d1fd61a'
})
const db = cloud.database()
const imageDatabase = db.collection('mini-program-image')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  async function addImage(fileId) {
    const addResult = await imageDatabase.add({
      data: {
        _openid: wxContext.OPENID,
        fileId: fileId
      }
    })
    const selectResult = await imageDatabase.doc(addResult._id).get()
    return selectResult.data
  }

  function deleteImage() {
  }

  function updateImage() {
  }

  async function selectImage() {
    const selectResult = await imageDatabase.doc(wxContext.OPENID).get()
    return selectResult.data
  }

  switch (event.flag) {
    case "add":
      return addImage(event.fileId)
    case "delete":
      return deleteImage()
    case "update":
      return updateImage()
    case "select":
      return selectImage()
  }

}
