import { Worker } from '@temporalio/worker';
import { TestWorkflowEnvironment } from '@temporalio/testing';
import { defaultWorkerOptions } from 'worker';
import { testNetworkError } from '../workflows';

const taskQueue = 'networkError';

describe('Test Networking error.', () => {
    let worker: Worker;
    let workerRunning: Promise<void>;
    let temporalTestEnv: TestWorkflowEnvironment;
    beforeAll(async () => {
        temporalTestEnv = await TestWorkflowEnvironment.createTimeSkipping();
          worker = await Worker.create({
            ...defaultWorkerOptions(temporalTestEnv.client.workflow),
            connection: temporalTestEnv.nativeConnection,
            taskQueue,
          });
        workerRunning = worker.run(); // Do not await, because we will shut it down after the test.
    }, 1000 * 60);
    it('Run test.',
        async () => {
            const client = temporalTestEnv.client.workflow;

            const handle = await client.start(testNetworkError, {
                taskQueue,
                workflowId: "testNetworkError"
            });
            await temporalTestEnv.sleep('20s');

            await handle.signal('test');
            await handle.signal('test');
            await handle.signal('test');
            await temporalTestEnv.sleep('20s'); 

            await handle.result();
        },
        1000 * 50
    );
});