import { Queue } from 'bullmq';
import { Redis } from 'ioredis';

export const emailQueue = new Queue('bulk-emails', {
  connection: new Redis(process.env.REDIS_URL!)
});
