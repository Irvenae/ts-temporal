import { Worker } from '@temporalio/worker';
import { WorkflowClient } from '@temporalio/client';
import { createWorker } from '../worker';
import { testCondition } from '../workflows';
import { terminateRunningTestWorkflow } from '../utils';

const taskQueue = 'condition';

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
            const workflowId = 'test-condition';
            await terminateRunningTestWorkflow(client, workflowId);

            await client.start(testCondition, {
                taskQueue,
                workflowId
            });

            await new Promise( f => setTimeout(f, 5000));

            const handle = client.getHandle(workflowId);
            await handle.signal('test');

            const res = await handle.result(); // Do not forget to wait on result.

            expect(res).toBe("Hello, test!");
        },
        1000 * 100
    );
});