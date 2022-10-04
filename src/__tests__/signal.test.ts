import { Worker } from '@temporalio/worker';
import { TestWorkflowEnvironment } from '@temporalio/testing';
import { defaultWorkerOptions } from 'worker';
import { testSignalling, testSignalling2 } from '../workflows';
import { temporal } from '@temporalio/proto';

const taskQueue = 'signal';

describe('Test Signalling workflows.', () => {
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
    it(
        'Run test.',
        async () => {
            const client = temporalTestEnv.workflowClient;

            const handle = await client.start(testSignalling2, {
                taskQueue,
                workflowId: "testSignalling2"
            });

            await client.execute(testSignalling, {
                taskQueue,
                workflowId: "testSignalling"
            });

            const status = (await handle.describe()).status.code;
            expect(status).toEqual(temporal.api.enums.v1.WorkflowExecutionStatus.WORKFLOW_EXECUTION_STATUS_COMPLETED);
        },
        1000 * 10
    );
});