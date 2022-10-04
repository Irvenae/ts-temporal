import { Worker } from '@temporalio/worker';
import { TestWorkflowEnvironment } from '@temporalio/testing';
import { defaultWorkerOptions } from 'worker';
import { example } from 'workflows';

const taskQueue = 'longActivity';

describe('Test long activity with test framework.', () => {
    let worker: Worker;
    let workerRunning: Promise<void>;
    let temporalTestEnv: TestWorkflowEnvironment;
    beforeAll(async () => {
        temporalTestEnv = await TestWorkflowEnvironment.create({
            testServer: {
              stdio: 'inherit',
            },
          });
          worker = await Worker.create({
            ...defaultWorkerOptions(temporalTestEnv.workflowClient),
            connection: temporalTestEnv.nativeConnection,
            taskQueue,
          });
        workerRunning = worker.run(); // Do not await, because we will shut it down after the test.
    }, 1000 * 60);
    afterAll(async () => {
        worker.shutdown();
        await workerRunning; // Wait for shutdown.
        await temporalTestEnv.teardown();
    });
    it(
        'Run test.',
        async () => {
            const workflowId = 'testLongActivity';
            const client = temporalTestEnv.workflowClient;
            
            const res = await client.execute(example, {
                taskQueue,
                workflowId,
                args: ["test", 1000*60*5]
            });

            expect(res).toBe("Hello, test!");
        },
        1000*60*6
    );
});