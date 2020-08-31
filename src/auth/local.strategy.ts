import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private readonly authService: AuthService){
        super();
    }

    async validate(username: string, password: string){
        const user = await this.authService.validateClient(username, password);
        if(user){
            return user;
        }else{
            throw new UnauthorizedException();
        }
    }

}