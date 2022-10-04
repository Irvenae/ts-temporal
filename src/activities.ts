import { Context } from '@temporalio/activity';
import { getContext } from "activityInterceptor";

export async function greet(name: string, time?: number): Promise<string> {
  if(time) {
    console.log("running activity with sleep time");
    await Context.current().sleep(time);
  }
  return `Hello, ${name}!`;
}

export async function signalWorkflow<T extends any[]>(
  workflowId: string,
  signalName: string, 
  args: T
) {
  const { client } = getContext();
  const handle = client.getHandle(workflowId);
  return await handle.signal<T>(signalName, ...args);
}
