import { Connection, WorkflowClient } from '@temporalio/client';
import { createWorker } from "worker";

async function runWorker() {
    const connection = await Connection.connect({});
    const client = new WorkflowClient({connection});
    const worker = await createWorker( "taskQueue", client);
    await worker.run();
  }
  
  runWorker().catch(err => {
    console.error(err);
    process.exit(1);
  });
