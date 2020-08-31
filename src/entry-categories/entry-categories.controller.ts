import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EntryCategoriesService } from './entry-categories.service';

@Controller('entry-categories')
export class EntryCategoriesController {

    constructor(private readonly entryCategoriesService: EntryCategoriesService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/mine')
    getMineCategories(@Request() req){
        return this.entryCategoriesService.getClientCategoriesItems(req.user._id);
    }

}
