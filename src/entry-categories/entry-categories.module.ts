import { Module } from '@nestjs/common';
import { EntryCategoriesController } from './entry-categories.controller';
import { EntryCategoriesService } from './entry-categories.service';

@Module({
  controllers: [EntryCategoriesController],
  providers: [EntryCategoriesService]
})
export class EntryCategoriesModule {}
