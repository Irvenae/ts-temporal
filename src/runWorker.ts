import { createWorker } from "worker";

async function runWorker() {
    const worker = await createWorker( "taskQueue");
    await worker.run();
  }
  
  runWorker().catch(err => {
    console.error(err);
    process.exit(1);
  });
