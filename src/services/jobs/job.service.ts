import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { jobModel } from './Dto/job.model';
import { CreateJobInput } from './Dto/CreateJob.input';
import { JobEntity } from './entity/job.entity';
import { Prisma } from '@prisma/client';
import { MyPoint } from './entity/geography.model';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  async createJob(dataInput: JobEntity): Promise<{}> {

    const poi: MyPoint = {
      latitude: dataInput.latitude,
      longitude: dataInput.longitude,
    }
    const point = `POINT(${poi.longitude} ${poi.latitude})`
    console.log(point);
    
    const job = await this.prisma.$queryRaw`
    INSERT INTO "jobs" (user_client_id,
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
    ) RETURNING *`;
    
    return job;
  }
}
