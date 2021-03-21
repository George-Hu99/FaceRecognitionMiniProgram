class UserDao {
  /**
   * 添加用户
   */
  static async addUser(user) {
    const addUserResult = await wx.cloud.callFunction({
      name: "user",
      data: {
        flag: 'add',
        user
      }
    })
    return addUserResult.result
  }

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
}

export {
  UserDao
}
