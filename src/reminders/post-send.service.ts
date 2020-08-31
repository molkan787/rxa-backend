import { Injectable } from "@nestjs/common";
import { DateTime } from 'luxon';
import { ReminderEntity } from "src/database/entities/reminder.entity";
import { Database } from "src/database/database.service";

@Injectable()
export class PostSendService{

    constructor(private readonly database: Database) {}

    async afterSent(reminder: ReminderEntity){
        if(reminder.auto_remove){
            await this.database.reminders.destroy(reminder._id, reminder._rev);
            await this.rescheduleReminder(reminder);
        }
    }

    async rescheduleReminder(reminder: ReminderEntity){
        const { reschedule, date, repeat, archived, _rev, _id,...props} = reminder;
        const newDate = this.addToDate(date, reschedule.plus);
        const newRepeat = repeat.map(d => this.addToDate(d, reschedule.plus));
        return await this.database.reminders.insert({
            date: newDate,
            repeat: newRepeat,
            reschedule: reschedule.copy_reschedule ? reschedule : false,
            archived: false,
            ...props
        })
    }

    addToDate(date, addition){
        return DateTime.fromISO(date).plus(addition).toJSDate().toJSON();
    }

}