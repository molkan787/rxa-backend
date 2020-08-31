import { Module } from '@nestjs/common';
import { AccountingEntryService } from './accounting-entry.service';
import { AccountingEntryController } from './accounting-entry.controller';

@Module({
  providers: [AccountingEntryService],
  controllers: [AccountingEntryController]
})
export class AccountingEntryModule {}
