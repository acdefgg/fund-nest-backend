import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  /**
   * Запись файла на диск
   * @param file
   * @returns
   */
  create(file) {
    const fileName = `${uuid.v4()}.jpg`;
    const filePath = path.join(__dirname, '..', '..', '..', 'uploads');
    const filePathDestination = path.join(filePath, fileName);
    const filePathStatic = path.join('uploads', fileName);

    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }

    try {
      fs.writeFileSync(filePathDestination, file.buffer);
    } catch (e) {
      throw new InternalServerErrorException(`Не удалось записать файл: ${e}`);
    }

    return filePathStatic;
  }
}
