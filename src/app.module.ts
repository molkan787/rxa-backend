import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { ClientAccountModule } from './client-account/client-account.module';
import { AuthModule } from './auth/auth.module';
import { AccountingEntryModule } from './accounting-entry/accounting-entry.module';
import { ClientDocumentsModule } from './client-documents/client-documents.module';
import { EntryCategoriesModule } from './entry-categories/entry-categories.module';
import { RemindersModule } from './reminders/reminders.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    DatabaseModule,
    ClientAccountModule,
    AuthModule,
    AccountingEntryModule,
    ClientDocumentsModule,
    EntryCategoriesModule,
    RemindersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
