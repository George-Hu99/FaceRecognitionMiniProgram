class communityPost {
  #_openid
  #_postId
  #_title
  #_content
  #_media
  #_releaseTime

  constructor(){
  }

  get openid() {
    return this.#_openid
  }

  set openid(value) {
    this.#_openid = value
  }

  get postId() {
    return this.#_postId
  }

  set postId(value) {
    this.#_postId = value
  }

  get title() {
    return this.#_title
  }

  set title(value) {
    this.#_title = value
  }

  get content() {
    return this.#_content
  }

  set content(value) {
    this.#_content = value
  }

  get content() {
    return this.#_content
  }

  set content(value) {
    this.#_content = value
  }

  get media() {
    return this.#_media
  }

  set media(value) {
    this.#_media = value
  }

  get releaseTime() {
    return this.#_releaseTime
  }

  set media(value) {
    this.#_releaseTime = value
  }
}

export {communityPost}