import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';

const { checkDB, sendEmail } = proxyActivities<typeof activities>({
  startToCloseTimeout: '10 seconds',
  retry: {
    maximumAttempts: 3,
  },
});

export async function sendEmailWorkflow(): Promise<void> {
  const email = await checkDB();
  if (!email) {
    console.log('No unsent emails found');
    return;
  }
  await sendEmail(email.id, email.message);
}
