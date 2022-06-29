import { Worker } from '@temporalio/worker';
import { WorkflowClient, Connection } from '@temporalio/client';
import { createWorker } from '../worker';
import { makeSpaghetti } from '../workflows';
import { terminateRunningTestWorkflow } from '../utils';
import { Meal, Sauce } from '../types';

const taskQueue = 'cooking';

describe('Test Spaghetti.', () => {
    let worker: Worker;
    let workerRunning: Promise<void>;
    beforeAll(async () => {
        worker = await createWorker(taskQueue);
        workerRunning = worker.run(); // Do not await, because we will shut it down after the test.
    }, 1000 * 60);
    afterAll(async () => {
      worker.shutdown();
      await workerRunning; // Wait for shutdown.
    }, 1000 * 60);
    it(
        'Run Veggie test.',
        async () => {
            const workflowId = 'test-veggie';
            const connection = new Connection({});
            const client = new WorkflowClient(connection.service);
            await terminateRunningTestWorkflow(client, workflowId);

            const res = await client.execute(makeSpaghetti, {
                taskQueue,
                workflowId,
                args: [Meal.VEGGIE_SPAGHETTI]
            });

            expect(res).toBe(Sauce.SAUCE_WITHOUT_MEAT);

            const { history } = await connection.service.getWorkflowExecutionHistory({
                namespace: 'default',
                execution: {
                  workflowId
                }
              });

              const foundActivities: string[] = [];
              history!.events!.forEach(event => {
                if (event.activityTaskScheduledEventAttributes) {
                    const activityName = event!.activityTaskScheduledEventAttributes!.activityType!.name!;
                    foundActivities.push(activityName);
                }
              });
            expect(foundActivities).toEqual(["getVegetables", "makeSauce"]);
        },
        1000 * 20
    );
});
