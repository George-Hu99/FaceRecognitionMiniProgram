const cloud = require('wx-server-sdk')
// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const tencentcloud = require("tencentcloud-sdk-nodejs")

cloud.init({
  // env: cloud.DYNAMIC_CURRENT_ENV
  env: 'wechatcloud-0g0j7gt09d1fd61a'
})

const wxContext = cloud.getWXContext()

exports.main = async (event, context) => {
  // get file ID
  const imageID = event.image
  const fileList = []
  fileList[0] = imageID
  // get temporary URL by file ID
  const result = await cloud.getTempFileURL({
    fileList: fileList
  })
  const tempFileURL = result.fileList[0].tempFileURL
  console.log("======== image temporary URL ========")
  console.log(tempFileURL)
  console.log("=====================================")

  const IaiClient = tencentcloud.iai.v20200303.Client
  // 腾讯云配置
  const clientConfig = {
    credential: {
      secretId: "",
      secretKey: ""
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
      console.log("========image detect result===========")
      console.log(data)
      console.log("======================================")
      detectResult = data
    },
    (err) => {
      console.log("======image detect error occured======")
      console.error("error", err)
      console.log("======================================")
      return -1
    }
  )


  // 保存识别结果


  /*--------------------------------------
  * 人脸注册
  * 将当前检测的人脸注册到人脸库中
  --------------------------------------*/
  // const add_face_params = {
  //   "GroupId": "001",
  //   "PersonName": wxContext.OPENID,
  //   "PersonId": wxContext.OPENID,
  //   "Gender": detectResult.FaceDetailInfos[0].FaceDetailAttributesInfo.Gender.Type + 1,
  //   "Url": tempFileURL,
  //   "UniquePersonControl": 3,
  //   "QualityControl": 0
  // }
  // client.CreatePerson(add_face_params).then(
  //   (data) => {
  //     console.log("=============image regist result=============");
  //     console.log(data)
  //     console.log("==============================================");
  //   },
  //   (err) => {
  //     console.log("=============image regist error occured=============");
  //     console.error("error", err)
  //     console.log("==============================================");
  //   }
  // )
  return detectResult
}
