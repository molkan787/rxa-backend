import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientAccountService } from 'src/client-account/client-account.service';
const md5 = require('md5');

@Injectable()
export class AuthService {

    constructor(
        private readonly clientAccountService: ClientAccountService,
        private readonly jwtService: JwtService
    ) {}

    async validateClient(username: string, password: string){
        const user = await this.clientAccountService.getByUsername(username);
        const hash = md5(password);
        if(user && user.password === hash){
            const { password, ...data } = user;
            return data;
        }else{
            return null;
        }
    }

    async login(user: any){
        const payload = {
            username: user.username,
            sub: user._id
        };
        return {
            user,
            access_token: this.jwtService.sign(payload, { expiresIn: '6h' })
        }
    }

}
