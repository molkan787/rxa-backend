import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { SenderService } from './sender.service';
import { QueuingService } from './queuing.service';
import { EmailingService } from './emailing.service';
import { PostSendService } from './post-send.service';

@Module({
  providers: [
    RemindersService,
    SenderService,
    QueuingService,
    EmailingService,
    PostSendService
  ]
})
export class RemindersModule {}
