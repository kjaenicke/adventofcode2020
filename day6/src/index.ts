import { input } from "./input";

function parse() {
  return input.trim().split("\n\n");
}

function partOne() {
  const parsed = parse();

  return parsed.reduce((totalUniqueAnswers, answerLists) => {
    const answers = answerLists.split("\n");
    const trueAnswerMap: Record<string, boolean> = {};

    answers.forEach((answer) => {
      answer.split("").forEach((trueAnswer) => {
        if (!trueAnswerMap[trueAnswer]) {
          trueAnswerMap[trueAnswer] = true;
        }
      });
    });

    return totalUniqueAnswers + Object.keys(trueAnswerMap).length;
  }, 0);
}

function partTwo() {
  const parsed = parse();

  return parsed.reduce((totalSharedAnswers, answerLists) => {
    const answers = answerLists.split("\n");
    const peopleInGroupCount = answers.length;
    const trueAnswerMap: Record<string, number> = {};

    answers.forEach((answer) => {
      answer.split("").forEach((trueAnswer) => {
        if (!trueAnswerMap[trueAnswer]) {
          trueAnswerMap[trueAnswer] = 1;
        } else {
          trueAnswerMap[trueAnswer]++;
        }
      });
    });

    return (
      totalSharedAnswers +
      Object.values(trueAnswerMap).filter((v) => v === peopleInGroupCount)
        .length
    );
  }, 0);
}

console.log(`Total true answers: ${partOne()}`);
console.log(`Total true answers for all group members: ${partTwo()}`);
