export class ReminderEntity{
    _id?: string;
    _rev?: string;
    date: string;
    client_id: string;
    auto_remove?: boolean;
    type: string;
    content: { title: string, body: string };
    notify_client?: boolean;
    reschedule?: any;
    repeat?: any[];
    sent_count?: number;
    options?: any;
    archived?: boolean;
    created_at: string;
    updated_at: string;
}