import { Job } from "../entities/job.entity";

export interface IJobRepository {
  create(job: Job): Promise<Job>;
  findById(id: string): Promise<Job | null>;
  delete(id: string): Promise<void>;
}
