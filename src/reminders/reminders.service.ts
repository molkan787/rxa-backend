import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Database } from 'src/database/database.service';
import { SenderService } from './sender.service';

@Injectable()
export class RemindersService {

    constructor(
        private readonly database: Database,
        private readonly senderService: SenderService
    ) {}

    // @Cron(CronExpression.EVERY_MINUTE)
    @Cron(CronExpression.EVERY_DAY_AT_4AM)
    async triggerReminders(){
        const reminders = await this.getTodaysActiveRemindersIds();
        await this.handleReminders(reminders);
    }

    @Cron('1 1 6 1 apr *')
    async triggerAprilReminders(){
        const reminders = await this.getAprilActiveRemindersIds();
        await this.handleReminders(reminders);
    }

    @Cron('1 1 6 1 jul *')
    async triggerJulyReminders(){
        const reminders = await this.getAprilActiveRemindersIds();
        await this.handleReminders(reminders);
    }

    async handleReminders(reminders: string[]){
        for(let i = 0; i < reminders.length; i++){
            await this.senderService.queueReminder(reminders[i]);
        }
        console.log(`Queued ${reminders.length} reminders!`);
    }
    
    async getAprilActiveRemindersIds(){
        const dateRule = { $regex: `^${new Date().getFullYear()}` };
        return (await this.database.reminders.find({
            fields: ['_id'],
            selector: {
                $or: [
                    { date: dateRule },
                    { repeat: dateRule }
                ],
                archived: false,
                notify_client: true,
                type: 'stm_april_acct_due'
            }
        })).docs.map(doc => doc._id);
    }

    async getTodaysActiveRemindersIds(){
        const date = this.today();
        const dateRule = { $regex: `^${date}` };
        return (await this.database.reminders.find({
            fields: ['_id'],
            selector: {
                $or: [
                    { date: dateRule },
                    { repeat: dateRule }
                ],
                archived: false,
                notify_client: true,
                type: {
                    $ne: 'stm_april_acct_due'
                }
            }
        })).docs.map(doc => doc._id);
    }

    today(): string{
        return new Date().toJSON().split('T')[0];
    }

}
