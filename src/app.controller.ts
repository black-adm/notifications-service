import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail/mail.service';

@Controller('v1')
export class AppController {
  constructor(private readonly mailService: MailService) {}

  @Get('hello')
  getHello(): string {
    return this.mailService.sendEmail();
  }
}
