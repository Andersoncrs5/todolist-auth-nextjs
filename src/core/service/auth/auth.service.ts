import {CreateUserDto} from "@/core/dto/user/create-user.dto";
import {api} from "@/core/api/api-client";
import {ResponseHTTP} from "@/core/res/response-http.res";
import {TokenResponse} from "@/core/res/token-response.res";

export class AuthService {
    private readonly path: string = 'v1/Auth'

    async register(dto: CreateUserDto) {
        return await api.post<ResponseHTTP<unknown>>(this.path+'/register', dto);
    }

    setTokens(token: TokenResponse) {
        localStorage.setItem('token', token.token);
        localStorage.setItem('tokenExp', token.expirationToken.toISOString());
        localStorage.setItem('refreshToken', token.refreshToken);
        localStorage.setItem('refreshTokenExp', token.expirationRefreshToken.toISOString());
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExp');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('refreshTokenExp');
    }

}