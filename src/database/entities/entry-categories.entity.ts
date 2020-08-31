export class EntryCategoriesEntity{
    _id?: string;
    _rev?: string;
    client_id: string;
    items: {
        text: string,
        value: string,
    }[];
}