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


  constructor() {
  }

  get id() {
    return this._id
  }

  set id(value) {
    this._id = value
  }

  get openid() {
    return this._openid
  }

  set openid(value) {
    this._openid = value
  }

  get avatarUrl() {
    return this._avatarUrl
  }

  set avatarUrl(value) {
    this._avatarUrl = value
  }

  get city() {
    return this._city
  }

  set city(value) {
    this._city = value
  }

  get country() {
    return this._country
  }

  set country(value) {
    this._country = value
  }

  get gender() {
    return this._gender
  }

  set gender(value) {
    this._gender = value
  }

  get language() {
    return this._language
  }

  set language(value) {
    this._language = value
  }

  get nickName() {
    return this._nickName
  }

  set nickName(value) {
    this._nickName = value
  }

  get province() {
    return this._province
  }

  set province(value) {
    this._province = value
  }

  get vipBeginTime() {
    return this._vipBeginTime
  }

  set vipBeginTime(value) {
    this._vipBeginTime = value
  }

  get vipEndTime() {
    return this._vipEndTime
  }

  set vipEndTime(value) {
    this._vipEndTime = value
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
