import { Module } from '@nestjs/common';
import { ShortenerModule } from './shortener/shortener.module';
import { HealthModule } from './health/health.module';
import { NatsClientModule } from './nats-client/nats-client.module';

@Module({
  imports: [ShortenerModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
