import { NativeConnection, Worker } from '@temporalio/worker';
import { Connection, Client, ScheduleOverlapPolicy } from '@temporalio/client';
import * as activities from './activities';
import { sendEmailWorkflow } from './workflows';

async function setupSchedule(client: Client) {
  try {
    await client.schedule.create({
      scheduleId: 'send-emails-cron',
      spec: { intervals: [{ every: '5 seconds' }] },
      action: {
        type: 'startWorkflow',
        workflowType: sendEmailWorkflow,
        taskQueue: 'global',
        args: [],
      },
      policies: {
        overlap: ScheduleOverlapPolicy.SKIP,
      },
    });
    console.log('Created schedule: send-emails-cron');
  } catch (err: any) {
    if (err.code === 6) {
      console.log('Schedule already exists: send-emails-cron');
    } else {
      throw err;
    }
  }
}

async function run() {
  const [nativeConnection, connection] = await Promise.all([
    NativeConnection.connect({ address: 'localhost:7233' }),
    Connection.connect({ address: 'localhost:7233' }),
  ]);

  const client = new Client({ connection });

  await setupSchedule(client);

  try {
    const worker = await Worker.create({
      connection: nativeConnection,
      namespace: 'default',
      taskQueue: 'global',
      workflowsPath: require.resolve('./workflows'),
      activities,
    });

    await worker.run();
  } finally {
    await Promise.all([nativeConnection.close(), connection.close()]);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
