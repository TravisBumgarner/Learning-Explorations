
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let counter = 0 // This will be reset every time the worker restarts but between sequential calls to this activity, it'll increment. 
export async function count(): Promise<number> {
  await delay(3_000)
  counter++;
  return counter;
}


let message = "Hey" // This will be reset every time the worker restarts but between sequential calls to this activity, it'll increment. 
export async function scream(): Promise<string> {
  message += "!";
  return message;
}
