import { Injectable } from '@nestjs/common';
import { Database } from 'src/database/database.service';

@Injectable()
export class EntryCategoriesService {

    constructor(private readonly database: Database) {}

    async getClientCategoriesItems(client_id){
        const resp = await this.database.entryCategories.find({
            selector: {
                client_id,
            },
            limit: 1
        });
        const doc = resp.docs[0];
        return (doc && doc.items) || [];
    }

}
