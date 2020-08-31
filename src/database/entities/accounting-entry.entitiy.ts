export class AccountingEntryEntity{
    _id?: string;
    _rev?: string;
    client_id: string;
    entry_type: string;
    date: string;
    category: string;
    amount: number;
    note?: string;
    created_at: string;
    updated_at: string;
}