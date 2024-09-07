import { Module } from '@nestjs/common';
import { ShortenerController as ShortenerController } from './shortener.controller';
import { ShortenerService } from './shortener.service';

@Module({
  imports: [],
  controllers: [ShortenerController],
  providers: [ShortenerService],
})
export class ShortenerModule {}
