import { IsEmail, IsInt, IsNotEmpty, IsString,  IsPhoneNumber } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  contact_name: string;

  @IsEmail()
  contact_email: string;

//   @IsString()
//   contact_phone: string;


@IsPhoneNumber('IN', { message: 'Invalid phone number' }) // Adjust the country code as needed
contact_phone: string;

  @IsString()
  @IsNotEmpty()
  contact_address: string;

  @IsInt()
  @IsNotEmpty()
  contact_pincode: number;
}
