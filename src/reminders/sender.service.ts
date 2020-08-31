import { Injectable } from "@nestjs/common";
import { Database } from "src/database/database.service";
import { QueuingService } from "./queuing.service";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ReminderEntity } from "src/database/entities/reminder.entity";
import { EmailingService } from "./emailing.service";
import { PostSendService } from "./post-send.service";

@Injectable()
export class SenderService{

    constructor(
        private readonly database: Database,
        private readonly queuingService: QueuingService,
        private readonly emailingService: EmailingService,
        private readonly postSendService: PostSendService
    ) {}

    @Cron(CronExpression.EVERY_5_MINUTES)
    async trigger(){
        try {
            await this.sendFromQueue();
        } catch (error) {
            console.error(error);
        }
    }

    async sendFromQueue(){
        const reminder_id = await this.queuingService.shift();
        if(reminder_id == null) return;
        
        const resp = await this.database.reminders.find({
            selector: {
                _id: reminder_id
            },
            limit: 1
        })
        const reminder = resp.docs[0];
        if(!reminder) return;

        this.sendReminder(reminder);
    }

    async sendReminder(reminder: ReminderEntity){
        const email = await this.getClientEmailAddress(reminder.client_id);
        if(email){
            await this.emailingService.sendEmail(email, reminder.content);
            console.log(`Sent email reminder. [${reminder._id}]`)
        }else{
            console.log(`Email address not found, reminder email not sent. [${reminder._id}]`)
        }
        await this.postSendService.afterSent(reminder);
    }

    async getClientEmailAddress(client_id: string){
        const resp = await this.database.client.find({
            selector: {
                _id: client_id
            },
            limit: 1
        });
        const doc = resp.docs[0];
        return (doc && doc.data.email) || null;
    }

    queueReminder(reminder_id: string){
        return this.queuingService.push(reminder_id);
    }

}