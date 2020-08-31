import * as nano from 'nano';
import { ClientAccountEntity } from "./entities/client-account.entitiy";
import { AccountingEntryEntity } from './entities/accounting-entry.entitiy';
import { ClientDocumentsEntity } from './entities/client-documents.entity';
import { EntryCategoriesEntity } from './entities/entry-categories.entity';
import { ReminderEntity } from './entities/reminder.entity';
import { QueueItemEntity } from './entities/queue-item.entity';
import { ClientEntity } from './entities/client.entity';

export class Database{

    public readonly clientAccount: nano.DocumentScope<ClientAccountEntity>;
    public readonly accountingEntry: nano.DocumentScope<AccountingEntryEntity>;
    public readonly clientDocuments: nano.DocumentScope<ClientDocumentsEntity>;
    public readonly entryCategories: nano.DocumentScope<EntryCategoriesEntity>;
    public readonly reminders: nano.DocumentScope<ReminderEntity>;
    public readonly remindersQueue: nano.DocumentScope<QueueItemEntity>;
    public readonly client: nano.DocumentScope<ClientEntity>;

    constructor(){
        const connection = nano({
            url: true ? 'http://admin:123456@localhost:5984' : 'http://admin:EgetUgMKxKfVE8apUfha@localhost:5984',
        });
        this.clientAccount = connection.use('rxa_clients_accounts');
        this.accountingEntry = connection.use('rxa_accounting_entries');
        this.clientDocuments = connection.use('rxa_client_documents');
        this.entryCategories = connection.use('rxa_entries_categories');
        this.reminders = connection.use('rxa_reminders');
        this.remindersQueue = connection.use('rxa_reminders_queue');
        this.client = connection.use('rxa_clients');
    }

}
