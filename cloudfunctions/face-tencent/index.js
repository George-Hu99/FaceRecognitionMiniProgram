// 云函数入口文件
const cloud = require('wx-server-sdk')
// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const tencentcloud = require("tencentcloud-sdk-nodejs")

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  // env: cloud.DYNAMIC_CURRENT_ENV
  env: 'wechatcloud-0g0j7gt09d1fd61a'
})

const wxContext = cloud.getWXContext()

// 云函数入口函数
exports.main = async (event, context) => {
  const imageID = event.image
  const fileList = []
  fileList[0] = imageID
  const result = await cloud.getTempFileURL({
    fileList: fileList
  })
  console.log("===============")
  console.log(result.fileList[0])
  console.log("===============")
  const tempFileURL = result.fileList[0].tempFileURL

  const IaiClient = tencentcloud.iai.v20200303.Client
  const clientConfig = {
    credential: {
      secretId: "AKID2pMfZCbMfhTyFIphU0GNEo9uRmsisyMU",
      secretKey: "1mHKelodDakurqbgwvglnZv2ytYyrVu7"
    },
    region: "ap-guangzhou",
    profile: {
      httpProfile: {
        endpoint: "iai.tencentcloudapi.com"
      }
    }
  }

  const client = new IaiClient(clientConfig)
  const params = {
    "MaxFaceNum": 1,
    "Url": tempFileURL,
    "FaceAttributesType": "Age,Beauty,Emotion,Eye,Eyebrow,Gender,Hair,Hat,Headpose,Mask,Mouth,Moustache,Nose,Shape,Skin,Smile"
  }
  let detectResult
  await client.DetectFaceAttributes(params).then(
    (data) => {
      console.log("========detectResult===========")
      console.log(data)
      console.log("===================")
      detectResult = data
    },
    (err) => {
      console.error("error", err)
    }
  )


  /*--------------------------------------
  * 人脸注册
  * 将当前检测的人脸注册到人脸库中
  --------------------------------------*/
  const add_face_params = {
    "GroupId": "001",
    "PersonName": wxContext.OPENID,
    "PersonId": wxContext.OPENID,
    "Gender": detectResult.FaceDetailInfos[0].FaceDetailAttributesInfo.Gender.Type + 1,
    "Url": tempFileURL,
    "UniquePersonControl": 3,
    "QualityControl": 0
  }
  client.CreatePerson(add_face_params).then(
    (data) => {
      console.log(data)
    },
    (err) => {
      console.error("error", err)
    }
  )
  return detectResult
}
