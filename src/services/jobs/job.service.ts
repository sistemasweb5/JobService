import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { jobModel } from './dto/job.model';
import { CreateJobInput } from './dto/CreateJob.input';
import { JobEntity } from './entity/job.entity';
import { Prisma } from '@prisma/client';
import { MyPoint } from './entity/geography.entity';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  async createJob(dataInput: CreateJobInput): Promise<number> {

    const point = this.createPoint(dataInput.latitude, dataInput.longitude);
    const job = await this.prisma.$executeRaw(
    Prisma.sql`INSERT INTO "jobs" (user_client_id,
      user_worker_id,
      created_at,
      job_type,
      status, 
      description,
      price,
      location
      ) VALUES (
        CAST(${dataInput.user_client_id} AS uuid),
        CAST(${dataInput.user_worker_id} AS uuid),
        ${new Date(dataInput.created_at)},
        ${dataInput.job_type},
        ${dataInput.status},
        ${dataInput.description},
        ${dataInput.price},
        ST_GeomFromText(${point}, 4326)
    )`);
    
    return job;
  }

  private createPoint(latitude: number, longitude: number): String {
    const poi: MyPoint = {
      latitude: latitude,
      longitude: longitude,
    }

    const point = `POINT(${poi.longitude} ${poi.latitude})`
    return point;
  }
}
