import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialty } from './entity/speciality.entity';
import { specialityService } from './service/speciality.service';

@Module({
  imports: [TypeOrmModule.forFeature([Specialty])],
  providers: [specialityService],
  exports: [specialityService],
})
export class SpecialityModule {}