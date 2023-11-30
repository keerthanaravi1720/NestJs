// contact/contact.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; // Import the main Prisma service
import { CreateContactDto } from './contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async createContact(createContactDto: CreateContactDto) {
    const contact = await this.prisma.prisma.contact.create({
      data: createContactDto,
    });

    // return contact;
    console.log('contact')
    return {
        message: 'Contact created successfully',
        data: contact,
      };
  }
}

