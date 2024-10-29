import { Job } from "../entities/job.entity";

export interface IJobRepository {
  create(job: Job): Promise<Job>;
  update(idActualJob: string, job: Job): Promise<Job>;
  findById(id: string): Promise<Job | null>;
}
