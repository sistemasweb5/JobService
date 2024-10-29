import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkSchedule } from '../entity/workSchedule.entity';
import { Specialty } from '../entity/speciality.entity';

@Injectable()
export class specialityService {
  constructor(
    @InjectRepository(Specialty)
    private readonly specialityRepository: Repository<Specialty>,
  ) {}

  async findSpecialityById(id: string): Promise<Specialty> {
    const speciality = await this.specialityRepository
      .createQueryBuilder('speciality')
      .leftJoinAndSelect('speciality.clients', 'client')
      .where('speciality.id = :id', { id })
      .getOne();

    if (!speciality) {
      throw new NotFoundException(`Speciality schedule with ID ${id} not found`);
    }

    return speciality;
  }
}
