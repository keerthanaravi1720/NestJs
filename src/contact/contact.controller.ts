import { Controller, Post,Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './contact.dto';

@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) {}

    @Post('create')
    async create(@Body() createContactDto: CreateContactDto) {
      return this.contactService.createContact(createContactDto);
     
    }


}









//     @Post('create')
// async create(@Body() createContactDto: CreateContactDto) {
//   const createdContact = this.contactService.createContact(createContactDto);

//   return {
//     message: 'Contact created successfully',
//     data: createdContact, 
 