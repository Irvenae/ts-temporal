import { proxyActivities, defineSignal, setHandler, condition, sleep } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from 'activities';

const { greet, signalWorkflow } = proxyActivities<typeof activities>({
  startToCloseTimeout: '10 minute',
});

/** A workflow that simply calls an activity */
export async function example(name: string, time?: number): Promise<string> {
    return await greet(name, time);
}

export const testSignal = defineSignal("test");

export async function testCondition() {
  let state = 'WAITING_ON_INPUT';
  setHandler(testSignal, () => {
    state = 'UPDATE';
  });

  const conditionPromise = condition(() => state === 'UPDATE', '10s' );
  await sleep('1s');
  const res = await greet("test");
  await conditionPromise;
  return res;
}

export async function testSignalling() {
  let state = 'WAITING_ON_INPUT';
  setHandler(testSignal, () => {
    state = 'UPDATE';
  });

  await signalWorkflow('testSignalling2', "test", []);

  await condition(() => state === 'UPDATE', '10s' );
}

export async function testSignalling2() {
  let state = 'WAITING_ON_INPUT';
  setHandler(testSignal, () => {
    state = 'UPDATE';
  });

  await condition(() => state === 'UPDATE', '10s' );
}
