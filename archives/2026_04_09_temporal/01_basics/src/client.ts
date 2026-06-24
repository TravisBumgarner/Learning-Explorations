import { Connection, Client } from '@temporalio/client';
import { loadClientConnectConfig } from '@temporalio/envconfig';
import { screamWorkflow, countWorkflow } from './workflows';
import { nanoid } from 'nanoid';

async function run() {
  const config = loadClientConnectConfig();
  const connection = await Connection.connect(config.connectionOptions);
  const client = new Client({ connection });

  const countHandle = await client.workflow.start(countWorkflow, {
    taskQueue: 'global',
    args: [],
    workflowId: 'workflow-' + nanoid(),
  });
  console.log(`Started workflow ${countHandle.workflowId}`);
  const countResult = await countHandle.result();
  console.log(`Count result: ${countResult}`);

  const screamHandle = await client.workflow.start(screamWorkflow, {
    taskQueue: 'global',
    args: [countResult],
    workflowId: 'workflow-' + nanoid(),
  });
  console.log(`Started workflow ${screamHandle.workflowId}`);
  console.log(`Scream result: ${await screamHandle.result()}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
