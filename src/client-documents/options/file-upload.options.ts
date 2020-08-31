import * as path from 'path';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const FileUploadOptions: MulterOptions = {
    fileFilter(req, file, cb){
        const ext = path.extname(file.originalname).substr(1);
        const allowed = ['pdf', 'docx', 'xlsx', 'xls', 'bmp', 'png', 'jpg', 'jpeg', 'gif'];
        cb(null, allowed.includes(ext));
    },
    limits: {
        fileSize: 1024 * 1024 * 32 // 32mb
    }
}