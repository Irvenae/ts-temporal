import { Worker } from '@temporalio/worker';
import { Connection } from '@temporalio/client';
import { defaultWorkerOptions } from '../worker';

xdescribe('replay', () => {
  it(
    'replay workflow',
    async () => {
      const workflowId = 'test-condition';
      const connection = await Connection.connect({});
      const { history } = await connection.workflowService.getWorkflowExecutionHistory({
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
          ...defaultWorkerOptions(),
          replayName: workflowId
        },
        history
      );
    },
    1000 * 60 * 10
  );
});