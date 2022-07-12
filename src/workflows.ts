import { proxyActivities, defineSignal, setHandler, condition, sleep } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';

const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

/** A workflow that simply calls an activity */
export async function example(name: string): Promise<string> {
    return await greet(name);
}

export const testSignal = defineSignal("test");

export async function testCondition() {
  debugger;
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