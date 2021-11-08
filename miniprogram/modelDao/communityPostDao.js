class communityPostDao {
  static async getOpenId() {
    // 调用云函数，获取用户 openID
    const openidRequestResult = await wx.cloud.callFunction({
      name: 'user',
      data: {
        flag: 'login'
      }
    })
    return openidRequestResult.result.openid
  }

  /**
   * 查找用户
   * @param {JSON} user 
   */
  static async selectUser(user) {
    const addUserResult = await wx.cloud.callFunction({
      name: "user",
      data: {
        flag: 'select',
        user
      }
    })
    return addUserResult.result
  }
  /**
   * 更新用户信息
   * @param {JSON} user 
   */
  static async updateUser(user) {
    const updateResult = await wx.cloud.callFunction({
      name: 'user',
      data: {
        flag: 'update',
        user
      }
    })
    return updateResult.result
  }
}

export {
  UserDao
}