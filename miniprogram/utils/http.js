import {
  promisic
} from "../miniprogram_npm/lin-ui/utils/util"

/**
 * @Description: HTTP请求工具类
 * @author: 盛文增
 * @date: 2020/10/8 13:09
 */
class Http {
  /**
   * 发起HTTP请求
   * @param url 请求URL
   * @param data 请求数据，默认无数狙
   * @param method 请求方法，默认为GET方法
   * @returns {Promise<*>}
   */
  static async request({
                         url,
                         data = {},
                         method = 'GET'
                       }) {
    return await promisic(wx.request)({
      // url: `https://www${url}`,
      url,
      data,
      method
    })
  }
}

export {
  Http
}
