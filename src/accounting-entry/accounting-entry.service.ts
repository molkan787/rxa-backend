import { Injectable } from '@nestjs/common';
import { Database } from 'src/database/database.service';
import { AddEntryDto } from './dtos/add-entry.dto';

@Injectable()
export class AccountingEntryService {

    constructor(private readonly database: Database) {}

    async addEntry(clientId: string, addEntryDto: AddEntryDto){
        const now = new Date().toJSON();
        return await this.database.accountingEntry.insert({
            ...addEntryDto,
            client_id: clientId,
            created_at: now,
            updated_at: now,
        })
    }

}
