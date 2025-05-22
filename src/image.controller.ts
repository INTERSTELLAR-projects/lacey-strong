// src/images/images.controller.ts
import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
@Controller('images')
export class ImagesController {
  @Get(':imageName')
  getImage(@Param('imageName') imageName: string, @Res() res: Response) {
    const imagePath = join(
      __dirname,
      '..',
      'assets',
      'images',
      imageName,
    );

    if (!existsSync(imagePath)) {
      return res.status(404).send('Image not found');
    }

    const stream = createReadStream(imagePath);
    stream.pipe(res);
  }
}
