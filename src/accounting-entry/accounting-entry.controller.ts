import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
import { AddEntryDto } from './dtos/add-entry.dto';
import { AccountingEntryService } from './accounting-entry.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('accounting-entry')
export class AccountingEntryController {

    constructor(private readonly accountingEntryService: AccountingEntryService) {}

    @UseGuards(JwtAuthGuard)
    @Post('/add')
    async addEntry(@Body() addEntryDto: AddEntryDto, @Request() req){
        return await this.accountingEntryService.addEntry(req.user._id, addEntryDto);
    }

}
