import { Worker } from '@temporalio/worker';
import * as activities from './activities';

export async function defaultWorkerOptions() {
    return {
      workflowsPath: require.resolve('./workflows'),
      activities,
      debugMode: true
    };
  }

export async function createWorker(taskQueue: string) {
  return await Worker.create({
    ...defaultWorkerOptions(),
    taskQueue
  });
}