import type { Operator } from "../typings/types";

function calculate(
  prevOperand: string,
  operator: Operator,
  nextOperand: string
) {
  const prevOperand_ = parseFloat(prevOperand);
  const nextOperand_ = parseFloat(nextOperand);

  switch (operator) {
    case "+":
      return prevOperand_ + nextOperand_;
    case "-":
      return prevOperand_ - nextOperand_;
    case "*":
      return prevOperand_ * nextOperand_;
    case "/":
      return nextOperand_ === 0
        ? "Error: Division by 0"
        : prevOperand_ / nextOperand_;
    default:
      return 0;
  }
}

export { calculate };
