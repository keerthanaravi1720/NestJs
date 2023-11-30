import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [ContactService, PrismaService],
  exports: [ContactService],
})
export class ContactModule {}
