import { Worker } from '@temporalio/worker';
import { WorkflowClient } from '@temporalio/client';
import { createWorker } from 'worker';
import { example } from 'workflows';
import { terminateRunningTestWorkflow } from 'utils';

const taskQueue = 'hello';

xdescribe('Test hello world workflow with Temporal cluster.', () => {
    let worker: Worker;
    let client: WorkflowClient;
    let workerRunning: Promise<void>;
    beforeAll(async () => {
        client = new WorkflowClient();
        worker = await createWorker(taskQueue, client);
        workerRunning = worker.run(); // Do not await, because we will shut it down after the test.
    }, 1000 * 60);
    afterAll(async () => {
        worker.shutdown();
        await workerRunning; // Wait for shutdown.
    });
    it(
        'Run test.',
        async () => {
            const workflowId = 'test-hello';
            const client = new WorkflowClient();
            await terminateRunningTestWorkflow(client, workflowId);

            const res = await client.execute(example, {
                taskQueue,
                workflowId,
                args: ["test"]
            });

            expect(res).toBe("Hello, test!");
        },
        1000 * 100
    );
});