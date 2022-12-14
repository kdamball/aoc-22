const input = `NZ
DCM
P

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`



const cleanInput = (inp: string) => {
  return inp.split('\n\n');
}
const getStack = (inp: string[]) => inp[0].split('\n').map(str => str.split(''));
const getInstr = (inp: string[]) => inp[1].replace(/move\s|from\s|to\s/g, '').split('\n').map(e => e.split(" ").map(Number).filter(e => e>0));

const getMovedStack = (stack: ReturnType<typeof getStack>, insts: ReturnType<typeof getInstr>, version = 9001) => {
  const finalStack = stack.slice();
  insts.forEach( inst => {
    const [count, from, to] = inst;
    const tempStack = finalStack.slice();
    const stackToMove = version === 9000 ? tempStack[from-1].slice(0,count).reverse() : tempStack[from-1].slice(0,count);
    finalStack[from-1] = finalStack[from-1].slice(count);
    finalStack[to-1] = [...stackToMove, ...finalStack[to-1]]
    console.log(inst, finalStack[to-1])
  });
  return finalStack.map(e => e[0]).join('');
}

const stack = getStack(cleanInput(input));
const instructions = getInstr(cleanInput(input));

export const topCrates = getMovedStack(stack, instructions);

console.log(topCrates)
