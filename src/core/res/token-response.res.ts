import {User} from "@/core/entities/User";

export interface TokenResponse {
    token: string
    refreshToken: string
    expirationToken: Date
    expirationRefreshToken: Date
    user: User
}