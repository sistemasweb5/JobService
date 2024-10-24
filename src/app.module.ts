import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { serviceModule } from './services/services.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ConfigModule.forRoot(), serviceModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService]
})
export class AppModule {}
