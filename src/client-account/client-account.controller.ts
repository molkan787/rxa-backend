import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { ClientAccountService } from "./client-account.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('client-account')
export class ClientAccountController{

    constructor(
        private readonly clientAccountService: ClientAccountService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get('/me')
    getMe(@Request() req){
        return req.user;
    }

}