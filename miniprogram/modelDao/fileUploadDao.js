import {FileUpload} from "../model/fileUpload"

class FileUploadDao {
    //调用云函数，获取用户ID
    static async getOpenId() {
        const openidRequestResult = await wx.cloud.callFunction({
            name: 'user',
            data: {
                flag: 'login'
            }
        })
        return openidRequestResult.result.openid
    }

    static fileiUpload(){
    const fileiUpload = new FileiUpload()
    fileiUpload.fileid = null
    fileiUpload.openid = openidRequestResult.result.openid
    fileiUpload.uploadTime = null
    }

}
export {
    FileUploadDao
}