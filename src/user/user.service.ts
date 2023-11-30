



import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService ) {}

  async createUser(data: {
    firstname: string;
    lastname: string;
    age: number;
    password: string;
    phonenumber: string;
    email: string;
  }) {
    // Hash the user's password before saving it to the database
    const hashedPassword = await bcrypt.hash(data.password, 10);

    try {
      return await this.prisma.prisma.user.create({
        

        data: { ...data, password: hashedPassword },
      });
    } catch (error) {
      throw new Error(`Failed to create a user: ${error.message}`);
    }
  }

  async loginUser(email: string, password: string) {
    const user = await this.prisma.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new NotFoundException('Invalid password');
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ userId: user.id }, 'your-secret-key', {
      expiresIn: '1h', // Set the token expiration time as needed
    });

    


    
   
    return { message: 'Login successful', token };
  }

  


  

  async getUserDetailsById(userId: number) {
    const user = await this.prisma.prisma.user.findUnique({
      where: { id: userId },
    });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    const { firstname, lastname } = user;
  
    // Customize the welcome message
    const welcomeMessage = `Welcome back, ${firstname} ${lastname}`;
  
    // Remove sensitive information (e.g., password) before returning the user object
    const { password, ...userWithoutPassword } = user;
  
    return { message: welcomeMessage, user: userWithoutPassword };
  }
  
  
  async getUserById(userId: number) {
    return await this.prisma.prisma.user.findUnique({
      where: { id: userId },
    });
  }
  
  




  

}
