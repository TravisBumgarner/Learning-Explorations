import { Connection, Client } from '@temporalio/client';
import { loadClientConnectConfig } from '@temporalio/envconfig';
import { screamWorkflow, countWorkflow } from './workflows';
import { nanoid } from 'nanoid';

async function run() {
  const config = loadClientConnectConfig();
  const connection = await Connection.connect(config.connectionOptions);
  const client = new Client({ connection });

  const screamHandle = await client.workflow.start(screamWorkflow, {
    taskQueue: 'global',
    // type inference works! args: [name: string]
    args: [],
    // in practice, use a meaningful business ID, like customerId or transactionId
    workflowId: 'workflow-' + nanoid(),
  });
  
  console.log(`Started workflow ${screamHandle.workflowId}`);

  // optional: wait for client result
  console.log(await screamHandle.result()); 

  const countHandle = await client.workflow.start(countWorkflow, {
    taskQueue: 'global',
    // type inference works! args: [name: string]
    args: [],
    // in practice, use a meaningful business ID, like customerId or transactionId
    workflowId: 'workflow-' + nanoid(),
  });
  
  console.log(`Started workflow ${countHandle.workflowId}`);

  // optional: wait for client result
  console.log(await countHandle.result());
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
