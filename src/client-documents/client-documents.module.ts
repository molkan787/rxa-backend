import { Module } from '@nestjs/common';
import { ClientDocumentsService } from './client-documents.service';
import { ClientDocumentsController } from './client-documents.controller';

@Module({
  providers: [ClientDocumentsService],
  controllers: [ClientDocumentsController]
})
export class ClientDocumentsModule {}
