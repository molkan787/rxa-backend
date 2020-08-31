import { Injectable } from "@nestjs/common";
import { Database } from "src/database/database.service";
import { DocumentInsertResponse } from "nano";

@Injectable()
export class QueuingService{

    constructor(private readonly database: Database) {}

    push(data): Promise<DocumentInsertResponse>{
        return this.database.remindersQueue.insert({
            _id: this.now(),
            data
        });
    }

    async shift(): Promise<string | null>{
        const resp = await this.database.remindersQueue.find({
            selector: {
                _id: { $gt: 0 }
            },
            sort: [
                { _id: 'asc' }
            ],
            limit: 1
        })
        const doc = resp.docs[0];
        if(doc){
            await this.database.remindersQueue.destroy(doc._id, doc._rev);
        }
        return doc ? doc.data : null;
    }

    now(){
        return new Date().getTime().toString()
    }

}