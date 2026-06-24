
let counter = 0 // This will be reset every time the worker restarts but between sequential calls to this activity, it'll increment. 
export async function count(): Promise<number> {
  if(Math.random() < 0.5) {
    throw new Error('Random failure to demonstrate retry');
  }
  counter++;
  return counter;
}

export async function scream(count: number): Promise<string> {
  return 'Hey' + "!".repeat(count);
}
