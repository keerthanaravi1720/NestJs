// import { Controller, Body, Post } from '@nestjs/common';

// // @Controller('user')
// // export class UserController {}

// import { PrismaClient } from '@prisma/client';
// import { CreateUserDto } from './create-user.dto';

// @Controller('users')
// export class UserController {
//   constructor(private prisma: PrismaClient) {}

//   @Post('register')
//   async createUser(@Body() createUserDto: CreateUserDto) {
//     const user = await this.prisma.user.create({
//       data: createUserDto,
//     });
//     return user;
//   }
// }



// src/user/user.controller.ts



import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';



@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async createUser(@Body() userData) {
    return this.userService.createUser(userData);
  }

//   @Post('login')
//   async loginUser(@Body() loginData) {
//     const { email, password } = loginData;
//     return this.userService.loginUser(email, password);
//   }

// @Post('login')
// async loginUser(@Body() loginData) {
//   const { email, password } = loginData;
//   const result = await this.userService.loginUser(email, password);
//   return result;
// }

@Post('login')
async loginUser(@Body() loginData) {
  const { email, password } = loginData;
  const token = await this.userService.loginUser(email, password);
  return { token };
}


@Get('profile')
async getUserProfile(@Req() request: Request) {
  const authorization = request.headers.authorization;
  // Rest of the code


 
  if (!authorization) {
    throw new UnauthorizedException('Authorization header missing');
  }

  // Extract the token from the header (assuming it's in the 'Bearer' format)
  const token = authorization.split(' ')[1];

  // Verify and decode the token
  const decodedToken = jwt.verify(token, 'your-secret-key');

  // Fetch user details based on the token's payload
  const userId = (decodedToken as any).userId; // Cast to 'any' for simplicity

  // Retrieve user details from your service
  const user = await this.userService.getUserDetailsById(userId);

  return user;
}

}


