import { proxyActivities, defineSignal, setHandler, condition, sleep, CancellationScope, isCancellation } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from 'activities';

const { greet, greet2, greet3, signalWorkflow } = proxyActivities<typeof activities>({
  startToCloseTimeout: '10 minute',
});

/** A workflow that simply calls an activity */
export async function example(name: string, time?: number): Promise<string> {
    return await greet(name, time);
}

const testSignal = defineSignal("test");

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

export async function testNetworkError() {
    let scope: CancellationScope = new CancellationScope({cancellable:true});
    await greet('test'); 
    
    setHandler(testSignal, () => {
      scope.cancel();
    });
  
      await greet2('test');
      for (;;) {
        try {
          // eslint-disable-next-line no-loop-func
          await scope.run(async () => {
              await greet3('test');
              await sleep('1d');
      
          });
          break;
        } catch (err) {
          if (!isCancellation(err) || CancellationScope.current().consideredCancelled) throw err;
          scope = new CancellationScope({ cancellable: true });
        }
      }
  }
