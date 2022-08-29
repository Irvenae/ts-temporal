import path from 'path';

import { Worker } from '@temporalio/worker';
import * as activities from 'activities';

export function defaultWorkerOptions() {
    return {
      workflowsPath: require.resolve('./workflows'),
      activities,
      shutdownGraceTime: '10s',
      debugMode: true,
      webpackConfigHook: {
        resolve : {
          roots: [path.dirname(__filename)]
        }
      }
    };
  }

export async function createWorker(taskQueue: string) {
  return await Worker.create({
    ...defaultWorkerOptions(),
    taskQueue
  });
}