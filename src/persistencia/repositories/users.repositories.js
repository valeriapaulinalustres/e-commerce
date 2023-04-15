import UsersDBDTO from "../DTO/usersDB.dto.js"
import UsersRespDTO from "../DTO/usersResp.dto.js";

export default class UsersRepository {
    constructor(dao){
        this.dao = dao
    }

    async createUser(user){
        const userDBDTO = new UsersDBDTO(user)
        const userDAO = this.dao.createUser(userDBDTO)
        const usersRespDTO = new UsersRespDTO(userDAO)
        return usersRespDTO
    }
}