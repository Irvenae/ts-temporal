import { Connection, WorkflowClient } from '@temporalio/client';
import { example } from './workflows';

async function runClient() {
  const connection = new Connection({});

  const client = new WorkflowClient(connection.service);

  const handle = await client.start(example, {
    args: ['Temporal'],
    taskQueue: "taskQueue",
    // Use a meaningful business id, eg customerId or transactionId.
    workflowId: 'workflow-hello',
  });
  console.log(`Started workflow ${handle.workflowId}`);

  console.log(await handle.result()); // Hello, Temporal!
}

runClient().catch((err) => {
  console.error(err);
  process.exit(1);
});