export default class UsersRespDTO {
    constructor(user) {
      this.full_name = user.full_name
      this.age = user.age
    }
  }