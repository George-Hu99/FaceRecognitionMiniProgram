// 能够在云函数中操作数据库、存储以及调用其他云函数的库
const cloud = require('wx-server-sdk')
const got = require('got');
const AipFaceClient = require("./node_modules/baidu-aip-sdk").face;
const HttpClient = require("./node_modules/baidu-aip-sdk").HttpClient;

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  // env: cloud.DYNAMIC_CURRENT_ENV
  env: 'cloud-environment-01-3bgd91f9ed3'
})
// 云函数入口函数
exports.main = async (event, context) => {
  const image = event.image
  const response = await got(image);
  const imagebase64 = response.body
  // 设置APPID/AK/SK
  const APP_ID = "23544499";
  const API_KEY = "Kr7axGopAndcenNgltFOQ3Td";
  const SECRET_KEY = "XVuZd7XG1PKkowLgD7V2cHBTdmcogxTk";
  // 新建一个对象，建议只保存一个对象调用服务接口
  var client = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);
  HttpClient.setRequestInterceptor(function (requestOptions) {
    // 查看参数
    console.log(requestOptions)
    // 修改参数
    requestOptions.timeout = 5000;
    // 返回参数
    return requestOptions;
  });
  var imageType = "BASE64";

  var detect_options = {};
  detect_options["face_field"] = "age,beauty,expression,face_shape,gender,glasses,quality,eye_status,emotion,face_type";
  detect_options["max_face_num"] = "1";
  detect_options["face_type"] = "LIVE";
  detect_options["liveness_control"] = "LOW";

  // 带参数调用人脸检测
  const detectResult = await client.detect(imagebase64, imageType, detect_options)
  console.log(detectResult)

  const userProfile = await cloud.callFunction({
    name: 'user',
    data: {
      flag: 'login'
    }
  })
  console.log("=========userProfile============");
  console.log(userProfile)
  console.log("================================");
  var addUser_options = {};
  addUser_options["user_info"] = userProfile;
  addUser_options["quality_control"] = "NORMAL";
  addUser_options["liveness_control"] = "LOW";
  addUser_options["action_type"] = "REPLACE";

  const groupId = "miniprogrom"
  const wxContext = cloud.getWXContext()
  const userId = wxContext.OPENID
  // 带参数调用人脸注册
  const addUserResult = await client.addUser(imagebase64, imageType, groupId, userId, addUser_options).then(function (result) {
    console.log(JSON.stringify(result));
  })
  console.log("=========addUserResult============");
  console.log(addUserResult)
  console.log("================================");

  return JSON.stringify(detectResult);
}