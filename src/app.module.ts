import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
// import { JwtStrategy } from './user/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ContactController } from './contact/contact.controller';
import { ContactModule } from './contact/contact.module';


@Module({
  imports: [UserModule,  JwtModule.register({
    secret: 'your-secret-key', // Replace with your actual secret key
}), ContactModule, ],
  controllers: [AppController, ContactController],
  providers: [AppService, ], 
})
export class AppModule {}

