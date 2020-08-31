import { Controller, UseGuards, Post, Request, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/auth')
  async auth(@Request() req){
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/check')
  async check(){
    return { ok: true };
  }

}