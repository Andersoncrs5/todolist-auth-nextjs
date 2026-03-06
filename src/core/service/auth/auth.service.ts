import {CreateUserDto} from "@/core/dto/user/create-user.dto";
import {api} from "@/core/api/api-client";
import {ResponseHTTP} from "@/core/res/response-http.res";
import {TokenResponse} from "@/core/res/token-response.res";
import {LoginUserDto} from "@/core/dto/user/login-user.dto";
import {User} from "@/core/entities/User";

export class AuthService {
    private readonly path: string = 'v1/Auth'

    async register(dto: CreateUserDto) {
        return await api.post<ResponseHTTP<unknown>>(this.path+'/register', dto);
    }

    async login(dto: LoginUserDto) {
        return await api.post<ResponseHTTP<unknown>>(this.path+'/login', dto);
    }

    isLogged(): boolean {
        if (typeof window === 'undefined') return false;

        const token = localStorage.getItem('token');
        return !!token;
    }

    getUserLogged(): User | null {
        if (typeof window === 'undefined') return null;

        const userJson = localStorage.getItem('user');
        if (!userJson) return null;

        return JSON.parse(userJson) as User;
    }

    setTokens(token: TokenResponse) {
        try {
            localStorage.setItem('token', token.token);
            localStorage.setItem('refreshToken', token.refreshToken);
            if (token.expirationRefreshToken) {
                localStorage.setItem('refreshTokenExp', token.expirationRefreshToken.toString());
            }
            if (token.expirationToken) {
                localStorage.setItem('tokenExp', token.expirationToken.toString());
            }
            localStorage.setItem("user", JSON.stringify(token.user));
        } catch (e) {
            console.error(e);
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExp');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('refreshTokenExp');
        localStorage.removeItem('user');
    }

}