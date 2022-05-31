import { Worker } from '@temporalio/worker';
import * as activities from './activities';

export async function createWorker(taskQueue: string) {
  return await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    activities,
    taskQueue,
    debugMode: true
  });
}