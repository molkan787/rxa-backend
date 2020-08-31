import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { ClientAccountModule } from 'src/client-account/client-account.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ClientAccountModule,
    PassportModule,
    JwtModule.register({
      secret: AuthConstants.secret,
      signOptions: {
        expiresIn: '60s',
      }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
