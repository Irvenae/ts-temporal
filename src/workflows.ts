import { proxyActivities, defineSignal, setHandler, CancellationScope, isCancellation, sleep } from '@temporalio/workflow';

// Only import the activity types
import type * as activities from './activities';
import { Meal, Sauce } from './types';

const { greet, getVegetables, makeSauce, getMeat, bakeMeat, addMeatToSauce, returnVegetables } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

/** A workflow that simply calls an activity */
export async function example(name: string): Promise<string> {
    return await greet(name);
}

export const cancelOrderSignal = defineSignal('cancelOrder');

interface Compensation {
  msg: string;
  fn: () => Promise<void>;
}

async function compensate(compensations: Compensation[] = []) {
  if (compensations.length > 0) {
    console.log('Compensating for cancelled spaghetti.');
    for (const comp of compensations) {
      try {
        console.log(comp.msg);
        await comp.fn();
      } catch (err) {
        console.log(`Failed to compensate: ${err}`);
        // swallow errors
      }
    }
  }
}

export async function makeSpaghetti(meal: Meal): Promise<string> {
  const scope = new CancellationScope();
  const cancelTimeout = 5000; // ms
  const startDate = Date.now();
  setHandler(cancelOrderSignal, () => {
    if (Date.now() - startDate < cancelTimeout) {
      scope.cancel();
    }
  });

  const compensations: Compensation[] = [];
  try {
    return await scope.run(async() => {
      const vegetables = await getVegetables(meal);
      compensations.unshift({msg: "Return Vegetables", fn: returnVegetables.bind(null, vegetables)});
      await sleep(1000);
      const saucePromise = makeSauce(vegetables);
      compensations.splice(0, 1);
      if (meal === Meal.SPAGHETTI) {
        const meat = await getMeat(meal);
        const bakedMeat = await bakeMeat(meat);
        const sauce = await saucePromise;
        return addMeatToSauce(bakedMeat, sauce);
      }
      return await saucePromise;
    });
  } catch(e) {
    await compensate(compensations);
    if (isCancellation(e)) {
      return Sauce.NO_SAUCE;
    } else {
      throw e;
    }
  }
}
