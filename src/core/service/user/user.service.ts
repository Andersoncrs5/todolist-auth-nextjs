import {api} from "@/core/api/api-client";

export class UserService {
    private readonly path: string = 'v1/User'

    async getUser() {
        return api.get(`${this.path}/me`)
    }

    async delete() {
        return api.delete(`${this.path}`)
    }
}