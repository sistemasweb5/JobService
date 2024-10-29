import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../entity/client.entity';
import { Category } from '../entity/category.entity';
import { CategoryService } from './category.service';
import { WorkScheduleService } from './workSchedule.service';
import { specialityService } from './speciality.service';
import { WorkSchedule } from '../entity/workSchedule.entity';
import { Specialty } from '../entity/speciality.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly categoryService : CategoryService,
    private readonly workscheduleService : WorkScheduleService,
    private readonly specialityService : specialityService  
  ) {}

  async findAllClients(): Promise<Client[]> {
    return await this.clientRepository.find();
  }

  async findDetailUserById(id: string) {
    const client = await this.clientRepository
      .createQueryBuilder('client')
      .leftJoinAndSelect('client.categoryid', 'category')
      .leftJoinAndSelect('client.workSchedule', 'workSchedule')
      .leftJoinAndSelect('client.specialty', 'specialty')
      .where('client.id = :id', { id })
      .getOne();

    if (!client) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return client;
  }

  async getCategory (clientID : string) : Promise<Category> {
    return this.categoryService.findCategoryById(clientID)
  }

  async getWorkschedule (clientID : string) : Promise<WorkSchedule> {
    return this.workscheduleService.findWorkScheduleById(clientID)
  }

  async getSpeciality (clientID : string) : Promise<Specialty> {
    return this.specialityService.findSpecialityById(clientID)
  }
    
}
