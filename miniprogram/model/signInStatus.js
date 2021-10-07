class signInStatus {
  #openid
  #status
  #signTime
  #signContent

  constructor(){
  }

  get openid() {
    return this.#_openid
  }

  set openid(value) {
    this.#_openid = value
  }

  get status() {
    return this.#_status
  }

  set status(value) {
    this.#_status = value
  }

  get signTime() {
    return this.#_signTime
  }

  set signTime(value) {
    this.#_signTime = value
  }

  get signContent() {
    return this.#_signContent
  }

  set signContent(value) {
    this.#_signContent = value
  }
}

export {signInStatus}