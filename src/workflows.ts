import { proxyActivities } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';
import { Meal } from './types';

const { greet, getVegetables, makeSauce } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

/** A workflow that simply calls an activity */
export async function example(name: string): Promise<string> {
    return await greet(name);
}

export async function makeSpaghetti(meal: Meal): Promise<string> {
  if (meal === Meal.VEGGIE_SPAGHETTI) {
    const vegetables = await getVegetables(meal);
    return makeSauce(vegetables);
  }
  throw new Error("Not implemented");
}
