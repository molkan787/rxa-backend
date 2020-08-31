import { Injectable } from "@nestjs/common";
import { Database } from "src/database/database.service";
import { ClientAccountEntity } from "src/database/entities/client-account.entitiy";

@Injectable()
export class ClientAccountService{

    constructor(private readonly database: Database) {}

    async getAllAccounts(): Promise<ClientAccountEntity[]>{
        const resp = await this.database.clientAccount.find({
            selector: {}
        });
        return resp.docs;
    }

    async getByUsername(username: string){
        const resp = await this.database.clientAccount.find({
            selector: {
                username,
            },
            limit: 1,
        });
        return resp.docs[0] || null;
    }

}