import { Controller, UseGuards, Post, UseInterceptors, UploadedFile, Request, BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadOptions } from './options/file-upload.options';
import { ClientDocumentsService } from './client-documents.service';

@Controller('client-documents')
export class ClientDocumentsController {

    constructor(private readonly clientDocumentsService: ClientDocumentsService) {}

    @UseGuards(JwtAuthGuard)
    @Post('/add')
    @UseInterceptors(FileInterceptor('file', FileUploadOptions))
    add(@UploadedFile() file, @Request() req){
        if(!file) throw new BadRequestException('File is required');
        return this.clientDocumentsService.addDocument(req.user._id, file);
    }

}
