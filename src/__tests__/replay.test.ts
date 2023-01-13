import { Worker } from '@temporalio/worker';
import { Connection, Client } from '@temporalio/client';
import { defaultWorkerOptions } from '../worker';

xdescribe('replay', () => {
  it(
    'replay workflow',
    async () => {
      const workflowId = 'test-condition';
      const connection = await Connection.connect({});
      const client = new Client({ connection });
      const { history } = await client.workflowService.getWorkflowExecutionHistory({
        namespace: 'default',
        execution: {
          workflowId
        }
      });
      if (!history) {
        throw new Error('Empty history');
      }

      await Worker.runReplayHistory(
        {
          ...defaultWorkerOptions(client.workflow),
          replayName: workflowId
        },
        history
      );
    },
    1000 * 60 * 10
  );
});