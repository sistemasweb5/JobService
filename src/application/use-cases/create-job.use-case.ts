import { Inject, Injectable } from '@nestjs/common';
import { IJobRepository } from 'src/domain/repositories/job.repository.interface';
import { CreateJobDto } from '../dtos/create-job.dto';
import { Job } from 'src/domain/entities/job.entity';
import { Location } from 'src/domain/value-objects/location.value-object';

@Injectable()
export class CreateJobUseCase {
  constructor(
    @Inject('IJobRepository')
    private readonly jobRepository: IJobRepository,
  ) {}

  async execute(dto: CreateJobDto): Promise<Job> {
    const job = new Job({
      userClientId: dto.userClientId,
      userWorkerId: dto.userWorkerId,
      jobType: dto.jobType,
      status: dto.status,
      description: dto.description,
      price: dto.price,
      createdAt: new Date(),
      location: new Location(dto.latitude, dto.longitude),
    });

    return this.jobRepository.create(job);
  }
}
