import { Location } from "../value-objects/location.value-object";

export class Job {
  id?: string;
  userClientId: string;
  userWorkerId?: string;
  jobType: string;
  status: string;
  description: string;
  createdAt: Date;
  price: number;
  location: Location;

  constructor(props: Partial<Job>) {
    Object.assign(this, props);
  }
}
