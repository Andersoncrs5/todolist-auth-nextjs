import {api} from "@/core/api/api-client";
import {UpdateUserDto} from "@/core/dto/user/update-user.dto";

export class UserService {
    private readonly path: string = 'v1/User'

    async getUser() {
        return api.get(`${this.path}/me`)
    }

    async delete() {
        return api.delete(`${this.path}`)
    }

    async update(data: UpdateUserDto) {
        data.name = data.name.trim()
        return api.put(`${this.path}`, data)
    }
}