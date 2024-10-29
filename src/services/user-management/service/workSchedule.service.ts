import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkSchedule } from '../entity/workSchedule.entity';

@Injectable()
export class WorkScheduleService {
  constructor(
    @InjectRepository(WorkSchedule)
    private readonly workscheduleRepository: Repository<WorkSchedule>,
  ) {}

  async findWorkScheduleById(id: string): Promise<WorkSchedule> {
    const workSchedule = await this.workscheduleRepository
      .createQueryBuilder('workSchedule')
      .leftJoinAndSelect('workSchedule.clients', 'client') 
      .where('workSchedule.id = :id', { id })
      .getOne();
  
    if (!workSchedule) {
      throw new NotFoundException(`Work schedule with ID ${id} not found`);
    }
  
    return workSchedule;
  }

}

