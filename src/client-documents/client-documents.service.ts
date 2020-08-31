import { Injectable } from '@nestjs/common';
import { Database } from 'src/database/database.service';

@Injectable()
export class ClientDocumentsService {

    constructor(private readonly database: Database) {}

    async addDocument(clientId: string, file: any){
        const attname = file.originalname.replace(/[^a-zA-Z0-9.\ ]/g, '');
        const resp = await this.database.clientDocuments.insert({
            client_id: clientId,
            name: attname,
            mimetype: file.mimetype,
            comment: '',
            created_at: new Date().toJSON()
        });
        return await this.database.clientDocuments.attachment.insert(
            resp.id,
            attname,
            file.buffer,
            file.mimetype,
            {
                rev: resp.rev
            }
        );
    }

}
