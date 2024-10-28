export class CreateJobDto {
  userClientId: string;
  userWorkerId?: string;
  jobType: string;
  status: string;
  description: string;
  price: number;
  latitude: number;
  longitude: number;
}
