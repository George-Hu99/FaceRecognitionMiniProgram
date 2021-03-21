class User {
  _id
  _openid
  avatarUrl
  city
  country
  gender
  language
  nickName
  province
  vipBeginTime
  vipEndTime
  //想要加更多的东西，比如注册时间 beginTime、lastLoginTime

  constructor(userInfo) {
    this._id = userInfo._id
    this._openid = userInfo._openid
    this.avatarUrl = userInfo.avatarUrl
    this.city = userInfo.city
    this.country = userInfo.country
    this.gender = userInfo.gender
    this.language = userInfo.language
    this.nickName = userInfo.nickName
    this.province = userInfo.province
    this.vipBeginTime = userInfo.vipBeginTime
    this.vipEndTime = userInfo.vipEndTime
  }

  toString() {
    // language=JSON
    return '{' +
      '"_id": ' + this._id + ',' +
      '"_openid":' + this._openid + ',' +
      '"avatarUrl":' + this.avatarUrl + ',' +
      '"city":' + this.city + ',' +
      '"country":' + this.country + ',' +
      '"gender":' + this.gender + ',' +
      '"language":' + this.language + ',' +
      '"nickName":' + this.nickName + ',' +
      '"province":' + this.province + ',' +
      '"vipBeginTime":' + this.vipBeginTime + ',' +
      '"vipEndTime":' + this.vipEndTime +
      '}'
  }
}

export {
  User
}
