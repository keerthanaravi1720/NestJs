


import { Controller, Post, Body, Get, Req , UseGuards  } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtAuthGuard } from 'src/jwt/auth.guard';
import AuthRequest from 'src/jwt/auth-request.interface';




@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async createUser(@Body() userData) {
    return this.userService.createUser(userData);
  }



@Post('login')
async loginUser(@Body() loginData) {
  const { email, password } = loginData;
  const token = await this.userService.loginUser(email, password);
  return { token };
}



// jwtguard//

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





//authguard//

@Get("auth-profile")
@UseGuards(JwtAuthGuard)
async getAuthUserProfile(@Req() request: AuthRequest) {
  const user = await this.userService.getUserById(request.user.id);
  return user;
}

}




