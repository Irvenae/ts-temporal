import { ApplicationFailure } from '@temporalio/common';
import { Context } from '@temporalio/activity'

import { BakedMeat, Meal, Meat, Sauce, Vegetable } from "./types";

export async function greet(name: string): Promise<string> {
  return `Hello, ${name}!`;
}

export async function getVegetables(meal: Meal): Promise<Record<Vegetable, number>> {
  await new Promise(f => setTimeout(f, 2000));

  if (meal === "Spaghetti") {
    return {
      "Tomato": 3,
      "Carrot": 2,
      "Onion": 1,
      "Celery": 0
    }
  }

  return {
    "Tomato": 4,
    "Carrot": 3,
    "Onion": 1,
    "Celery": 1
  }
}

export async function returnVegetables(vegetables: Record<Vegetable, number>): Promise<void> {
  await Context.current().sleep(2000);

  Object.keys(vegetables).forEach( vegetable => {
    console.log(`Returned ${vegetables[vegetable as Vegetable]} ${vegetable}`);
  });
}

export async function getMeat(meal: Meal): Promise<Record<Meat, number>> {
  await Context.current().sleep(1000);

  if (meal === "Spaghetti") {
    return {
      "Minced Meat": 1,
    }
  }

  throw ApplicationFailure.nonRetryable(`No meat found for meal ${meal}`);
}

export async function makeSauce(vegetables: Record<Vegetable, number>): Promise<Sauce> {
  let totalNrVegetables = 0;
  Object.values(vegetables).forEach( nrVegetable => {
    totalNrVegetables += nrVegetable;
  });

  // Comment out for testing failures:
  // if (Math.random() < 0.9) {
  //   console.log("Failed making sauce.");
  //   throw new Error("Failed making sauce");
  // }

  await Context.current().sleep(totalNrVegetables * 1000);

  return Sauce.SAUCE_WITHOUT_MEAT;
}

export async function bakeMeat(meat: Record<Meat, number>): Promise<Record<BakedMeat, number>> {
  const bakedMeat = {"Minced Meat": 0};

  let totalNrMeat = 0;
  Object.keys(meat).forEach( meatType => {
    const nrMeat = meat[meatType as Meat] as number;
    totalNrMeat += nrMeat; 
    bakedMeat[meatType as Meat] = nrMeat;
  });
  
  await Context.current().sleep(totalNrMeat * 2000);

  return bakedMeat;
}

export async function addMeatToSauce(bakedMeat: Record<BakedMeat, number>, sauce: Sauce): Promise<Sauce> {
  let totalNrBakedMeat = 0;
  Object.values(bakedMeat).forEach( nrMeat => {
    totalNrBakedMeat += nrMeat;
  });

  console.log(`Adding meat to ${sauce}`);

  await Context.current().sleep(totalNrBakedMeat * 500);
  return Sauce.SAUCE_WITH_MEAT; 
}

