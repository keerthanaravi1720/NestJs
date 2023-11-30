// src/prisma/prisma.service.ts
// prisma/prisma.service.ts

// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export class PrismaService {
//   prisma = prisma;
// }


// prisma/prisma.service.ts
import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaService {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

 
  
}
