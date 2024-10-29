import { Inject, Injectable } from '@nestjs/common';
import { IJobRepository } from 'src/domain/repositories/job.repository.interface';

@Injectable()
export class DeleteJobUseCase {
  constructor(
    @Inject('IJobRepository')
    private readonly jobRepository: IJobRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.jobRepository.delete(id);
  }
}
