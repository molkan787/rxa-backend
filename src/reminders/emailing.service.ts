import { Injectable } from "@nestjs/common";
import * as GmailSend from 'gmail-send';

@Injectable()
export class EmailingService{

    private send: any;

    constructor(){
        this.send = GmailSend({
            user: 'drmstudio.eu@gmail.com',
            pass: 'Dream19980519'
        })
    }

    sendEmail(recipient, content: Content){
        return this.send({
            to: recipient,
            subject: content.title,
            text: content.body
        })
    }

}

interface Content{
    title: string;
    body: string;
}