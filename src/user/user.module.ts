import { Module } from '@nestjs/common';
import { UserService } from './user.service'; // Import your UserService
import { UserController } from './user.controller';
import { PrismaService } from 'prisma/prisma.service';
import { JwtGuard } from 'src/jwt/jwt.guard';

@Module({
  providers: [UserService,PrismaService, JwtGuard],
  controllers: [UserController], // Include UserService as a provider
  
})
export class UserModule {}

