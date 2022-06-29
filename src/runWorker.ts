import { createWorker } from "./worker";

async function runWorker() {
    const worker = await createWorker('cooking');

    await worker.run();
  }
  
  runWorker().catch(err => {
    console.error(err);
    process.exit(1);
  });
