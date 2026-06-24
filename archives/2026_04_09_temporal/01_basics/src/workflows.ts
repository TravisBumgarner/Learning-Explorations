
import { proxyActivities } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';

const { count, scream } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
  retry: {
    maximumAttempts: 1,
  },
});

/** A workflow that simply calls an activity */
export async function countWorkflow(): Promise<number> {
  return await count();
}

export async function screamWorkflow(count: number): Promise<string> {
  return await scream(count);
}
