import { input } from "./input";

function parse() {
  return input.trim().split("\n");
}

enum CommandType {
  Accumulator = "acc",
  Jump = "jmp",
  Noop = "nop",
}

function partOne() {
  const commands = parse();

  let accumulator = 0;
  let currentCommandIndex = 0;
  let commandsExecuted = 0;
  let commandChangeCount = 0;
  let processedCommandIndexs = new Set();

  while (true && commandsExecuted < commands.length * 10) {
    commandsExecuted++;

    if (processedCommandIndexs.has(currentCommandIndex)) {
      const [cmd] = commands[currentCommandIndex].split(" ");

      if (cmd !== CommandType.Accumulator) {
        if (commandChangeCount < 1) {
          commandChangeCount++;
          processedCommandIndexs.delete(currentCommandIndex);
          console.log({ cmd });

          if (cmd === CommandType.Jump) {
            console.log(`Changing ${commands[currentCommandIndex]}`);

            commands[currentCommandIndex] = commands[
              currentCommandIndex
            ].replace(CommandType.Jump, CommandType.Noop);

            accumulator = 0;
            currentCommandIndex = 0;
            processedCommandIndexs = new Set();
          } else if (cmd === CommandType.Noop) {
            console.log(`Changing ${commands[currentCommandIndex]}`);

            commands[currentCommandIndex] = commands[
              currentCommandIndex
            ].replace(CommandType.Noop, CommandType.Jump);
          }
        } else {
          console.log("Infinite loop found.");
          break;
        }
      }
    } else {
      processedCommandIndexs.add(currentCommandIndex);
    }

    const commandParts = commands[currentCommandIndex].split(" ");
    const [cmd, valueRaw] = commandParts;
    const value = parseInt(valueRaw);

    if (cmd === CommandType.Accumulator) {
      accumulator += value;
      currentCommandIndex++;
    }
    if (cmd === CommandType.Jump) {
      currentCommandIndex += value;
    }
    if (cmd === CommandType.Noop) {
      currentCommandIndex++;
    }
  }

  return accumulator;
}

console.log(`Value changing command: ${partOne()}`);
