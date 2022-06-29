import { proxyActivities } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';
import { Meal } from './types';

const { greet, getVegetables, makeSauce, getMeat, bakeMeat, addMeatToSauce } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

/** A workflow that simply calls an activity */
export async function example(name: string): Promise<string> {
    return greet(name);
}

export async function makeSpaghetti(meal: Meal): Promise<string> {
  const vegetables = await getVegetables(meal);
  const saucePromise = makeSauce(vegetables);
  if (meal === Meal.SPAGHETTI) {
    const meat = await getMeat(meal);
    const bakedMeat = await bakeMeat(meat);
    const sauce = await saucePromise;
    return addMeatToSauce(bakedMeat, sauce);
  }
  return saucePromise; 
}
