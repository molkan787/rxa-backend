import { IsString, IsDateString, IsPositive } from 'class-validator';

export class AddEntryDto{

    @IsString()
    entry_type: string;

    @IsDateString()
    date: string;

    @IsString()
    category: string;

    @IsPositive()
    amount: number;

    note: string;

}