import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './../prisma.service';
import { UserService } from './../user/user.service';
import { AuthDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwt;
    private userService;
    constructor(prisma: PrismaService, jwt: JwtService, userService: UserService);
    login(dto: AuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
            isAdmin: boolean;
        };
    }>;
    getNewTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
            isAdmin: boolean;
        };
    }>;
    register(dto: AuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
            isAdmin: boolean;
        };
    }>;
    private issueTokens;
    private returnUserFields;
    private validateUser;
}
