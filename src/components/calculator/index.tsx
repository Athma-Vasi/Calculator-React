import React, { useState } from "react";
import { BttnsContainer } from "../../styledTwComponents/bttnsContainer";
import { Display } from "../../styledTwComponents/display";
import { EnterBttn } from "../../styledTwComponents/enterBttn";
import { History } from "../../styledTwComponents/history";
import { OperandBttn } from "../../styledTwComponents/operandBttn";
import { OperatorBttn } from "../../styledTwComponents/operatorBttn";
import type { Dispatch, State } from "../../typings/types";

type CalculatorProps = {
  state: State;
  action: any;
  dispatch: React.Dispatch<Dispatch>;
};

function Calculator({ state, action, dispatch }: CalculatorProps) {
  const [operand, setOperand] = useState("");

  function handleOperandBttnClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const number = event.currentTarget.value;
    setOperand((prev) => `${prev}${number}`);
  }

  function handleDecimalBttnClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const value = event.currentTarget.value;
    if (!operand.includes(".")) setOperand((prev) => `${prev}${value}`);
  }

  return (
    <div className="grid h-full w-full grid-rows-6 gap-y-5">
      {/* history */}
      <History state={state}>History</History>

      {/* display */}
      <Display state={state} data-cy="display">
        {operand}
      </Display>

      {/* buttons */}
      <BttnsContainer state={state}>
        {/* row 1 */}
        <div className="row-span-1 grid grid-cols-4 gap-4">
          <OperandBttn
            data-cy="bttn-7"
            state={state}
            value="7"
            onClick={handleOperandBttnClick}
          >
            7
          </OperandBttn>
          <OperandBttn
            data-cy="bttn-8"
            state={state}
            value="8"
            onClick={handleOperandBttnClick}
          >
            8
          </OperandBttn>
          <OperandBttn
            data-cy="bttn-9"
            state={state}
            value="9"
            onClick={handleOperandBttnClick}
          >
            9
          </OperandBttn>
          <OperatorBttn state={state} className="text-2xl">
            /
          </OperatorBttn>
        </div>

        {/* row 2 */}
        <div className="row-span-1 grid grid-cols-4 gap-4">
          <OperandBttn
            state={state}
            data-cy="bttn-4"
            value="4"
            onClick={handleOperandBttnClick}
          >
            4
          </OperandBttn>
          <OperandBttn
            state={state}
            data-cy="bttn-5"
            value="5"
            onClick={handleOperandBttnClick}
          >
            5
          </OperandBttn>
          <OperandBttn
            state={state}
            data-cy="bttn-6"
            value="6"
            onClick={handleOperandBttnClick}
          >
            6
          </OperandBttn>
          <OperatorBttn state={state} className="text-3xl">
            +
          </OperatorBttn>
        </div>

        {/* row 3 */}
        <div className="row-span-1 grid grid-cols-4 gap-4">
          <OperandBttn
            state={state}
            data-cy="bttn-1"
            value="1"
            onClick={handleOperandBttnClick}
          >
            1
          </OperandBttn>
          <OperandBttn
            state={state}
            data-cy="bttn-2"
            value="2"
            onClick={handleOperandBttnClick}
          >
            2
          </OperandBttn>
          <OperandBttn
            state={state}
            data-cy="bttn-3"
            value="3"
            onClick={handleOperandBttnClick}
          >
            3
          </OperandBttn>
          <OperatorBttn state={state} className="text-3xl">
            -
          </OperatorBttn>
        </div>

        {/* row 4 */}
        <div className="row-span-1 grid grid-cols-4 gap-4">
          <OperandBttn
            state={state}
            data-cy="bttn-decimal"
            value="."
            onClick={handleDecimalBttnClick}
          >
            .
          </OperandBttn>
          <OperandBttn
            state={state}
            data-cy="bttn-0"
            value="0"
            onClick={handleOperandBttnClick}
          >
            0
          </OperandBttn>
          <OperandBttn state={state}>+/-</OperandBttn>
          <OperatorBttn state={state}>X</OperatorBttn>
        </div>

        {/* row 5 */}
        <div className="row-span-1 grid grid-cols-4 gap-4">
          <div className="col-span-2">
            <EnterBttn state={state} type="submit">
              =
            </EnterBttn>
          </div>

          <OperatorBttn state={state} className="col-span-1 text-base">
            CLEAR
          </OperatorBttn>
          <OperatorBttn state={state} className="col-span-1">
            DEL
          </OperatorBttn>
        </div>
      </BttnsContainer>
    </div>
  );
}

export default Calculator;
