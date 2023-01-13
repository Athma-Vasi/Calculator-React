import React from "react";
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
  return (
    <div className="grid h-full w-full grid-rows-6 gap-y-5 p-6">
      {/* history */}
      <History state={state}>History</History>

      {/* display */}
      <Display state={state}>Display</Display>

      {/* buttons */}
      <BttnsContainer state={state}>
        {/* row 1 */}
        <div className="row-span-1 grid grid-cols-4 gap-4">
          <OperandBttn state={state}>7</OperandBttn>
          <OperandBttn state={state}>8</OperandBttn>
          <OperandBttn state={state}>9</OperandBttn>
          <OperatorBttn state={state}>DEL</OperatorBttn>
        </div>

        {/* row 2 */}
        <div className="row-span-1 grid grid-cols-4 gap-4">
          <OperandBttn state={state}>4</OperandBttn>
          <OperandBttn state={state}>5</OperandBttn>
          <OperandBttn state={state}>6</OperandBttn>
          <OperatorBttn state={state}>+</OperatorBttn>
        </div>

        {/* row 3 */}
        <div className="row-span-1 grid grid-cols-4 gap-4">
          <OperandBttn state={state}>1</OperandBttn>
          <OperandBttn state={state}>2</OperandBttn>
          <OperandBttn state={state}>3</OperandBttn>
          <OperatorBttn state={state}>-</OperatorBttn>
        </div>

        {/* row 4 */}
        <div className="row-span-1 grid grid-cols-4 gap-4">
          <OperandBttn state={state}>.</OperandBttn>
          <OperandBttn state={state}>0</OperandBttn>
          <OperandBttn state={state}>/</OperandBttn>
          <OperatorBttn state={state}>X</OperatorBttn>
        </div>

        {/* row 5 */}
        <div className="row-span-1 grid grid-cols-4 gap-4">
          <OperatorBttn state={state} className="col-span-2">
            CLEAR
          </OperatorBttn>

          <div className="col-span-2">
            <EnterBttn state={state} type="submit">
              =
            </EnterBttn>
          </div>
        </div>
      </BttnsContainer>
    </div>
  );
}

export default Calculator;
