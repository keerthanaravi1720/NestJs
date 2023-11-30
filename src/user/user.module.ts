import { Module } from '@nestjs/common';
import { UserService } from './user.service'; // Import your UserService
import { UserController } from './user.controller';
import { PrismaService } from 'prisma/prisma.service';
import { JwtGuard } from 'src/jwt/jwt.guard';
import { JwtStrategy } from './jwt.strategy';


@Module({
  providers: [UserService,PrismaService, JwtGuard, JwtStrategy ],
  controllers: [UserController], // Include UserService as a provider
  
})
export class UserModule {}

