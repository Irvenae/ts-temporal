import { proxyActivities, defineSignal, setHandler, CancellationScope, isCancellation } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';
import { Meal, Sauce } from './types';

const { greet, getVegetables, makeSauce, getMeat, bakeMeat, addMeatToSauce } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

/** A workflow that simply calls an activity */
export async function example(name: string): Promise<string> {
    return await greet(name);
}

export const cancelOrderSignal = defineSignal('cancelOrder');

export async function makeSpaghetti(meal: Meal): Promise<string> {
  const scope = new CancellationScope();
  const cancelTimeout = 5000; // ms
  const startDate = Date.now();
  setHandler(cancelOrderSignal, () => {
    if (Date.now() - startDate < cancelTimeout) {
      scope.cancel();
    }
  });

  try {    
    return await scope.run(async() => {
      const vegetables = await getVegetables(meal);
      const saucePromise = makeSauce(vegetables);
      if (meal === Meal.SPAGHETTI) {
        const meat = await getMeat(meal);
        const bakedMeat = await bakeMeat(meat);
        const sauce = await saucePromise;
        return addMeatToSauce(bakedMeat, sauce);
      }
      return await saucePromise;
    });
  } catch(e) {
    if (isCancellation(e)) {
      return Sauce.NO_SAUCE;
    } else {
      throw e;
    }
  }
}
