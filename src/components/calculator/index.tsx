import React from "react";
import type { Action, Dispatch, Operator, State } from "../../typings/types";

import { BttnsContainer } from "../../styledTwComponents/bttnsContainer";
import { Display } from "../../styledTwComponents/display";
import { EnterBttn } from "../../styledTwComponents/enterBttn";
import { History } from "../../styledTwComponents/history";
import { OperandBttn } from "../../styledTwComponents/operandBttn";
import { OperatorBttn } from "../../styledTwComponents/operatorBttn";
import { stat } from "fs";

type CalculatorProps = {
  state: State;
  action: Action;
  dispatch: React.Dispatch<Dispatch>;
};

function Calculator({ state, action, dispatch }: CalculatorProps) {
  //

  //
  //
  function handleDecimalBttnClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    //fix the bug where nextOperand is not accepting a value after decimal

    const value = event.currentTarget.value;
    if (!state.appState.operand.includes(".")) {
      // setOperand((prev) => `${prev}${value}`);
      const newValue = `${state.appState.operand}${value}`;
      state.appState.operand = newValue;

      dispatch({
        type: action.app.setOperand,
        payload: {
          state,
        },
      });
    }
  }

  function handleToggleMinusClick() {
    // event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    const currentValue = state.appState.operand;

    if (state.appState.operand.includes("-")) {
      const newValue = currentValue.replace("-", "");
      // setOperand(newValue);
      state.appState.operand = newValue;

      dispatch({
        type: action.app.setOperand,
        payload: {
          state,
        },
      });
    }
    // else setOperand((prev) => `-${prev}`);
    else {
      const newValue = `-${currentValue}`;
      // setOperand(newValue);
      state.appState.operand = newValue;

      dispatch({
        type: action.app.setOperand,
        payload: {
          state,
        },
      });
    }
  }

  function handleClearBttnClick() {
    // event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    // setOperand("");
    state.appState.operand = "";

    dispatch({
      type: action.app.setOperand,
      payload: {
        state,
      },
    });
  }

  function handleBackspaceBttnClick() {
    // event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    const currentValue = state.appState.operand;
    const newValue =
      currentValue.at(-1) === "-" ? "-" : currentValue.slice(0, -1);
    // setOperand(newValue);
    state.appState.operand = newValue;

    dispatch({
      type: action.app.setOperand,
      payload: {
        state,
      },
    });
  }

  function handleOperandBttnClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const number = event.currentTarget.value;
    if (state.appState.operand.length < 13) {
      const newValue = `${state.appState.operand}${number}`;

      //when operand is clicked right after an answer is displayed, resets answer to empty to allow operand to be displayed on screen
      state.appState.answer = "";
      dispatch({
        type: action.app.setAnswer,
        payload: {
          state,
        },
      });

      //sets operand to new value to be displayed
      state.appState.operand = newValue;
      dispatch({
        type: action.app.setOperand,
        payload: {
          state,
        },
      });
    }
  }

  function handleOperatorBttnClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const operator_ = event.currentTarget.value as Operator;

    state.appState.operator = operator_;
    dispatch({
      type: action.app.setOperator,
      payload: {
        state,
      },
    });

    const operand_ = state.appState.operand;
    state.appState.expressions.push(operand_);
    state.appState.expressions.push(operator_);
    dispatch({
      type: action.app.setExpression,
      payload: {
        state,
      },
    });

    state.appState.operand = "";
    dispatch({
      type: action.app.setOperand,
      payload: {
        state,
      },
    });

    if (state.appState.expressions.length > 2) {
      const [prevOperandStr, operator, nextOperandStr] =
        state.appState.expressions.slice(0, 3) as [string, Operator, string];

      {
        const largerLengthOfOperands =
          prevOperandStr.length > nextOperandStr.length
            ? prevOperandStr.length + 1
            : nextOperandStr.length + 1;

        const prevOperandDigitsAfterDecimal = prevOperandStr.includes(".")
          ? (prevOperandStr.split(".")[1]?.length as number)
          : (0 as number);

        const nextOperandDigitsAfterDecimal = nextOperandStr.includes(".")
          ? (nextOperandStr.split(".")[1]?.length as number)
          : (0 as number);

        //choose the smallest value of digits after decimal
        const resultDigitsAfterDecimal =
          prevOperandDigitsAfterDecimal > nextOperandDigitsAfterDecimal
            ? nextOperandDigitsAfterDecimal
            : prevOperandDigitsAfterDecimal;

        let result = "";
        const prevOperandNum = parseFloat(prevOperandStr);
        const nextOperandNum = parseFloat(nextOperandStr);

        switch (operator) {
          case "/": {
            nextOperandNum === 0
              ? (result = "Error: Divide by 0")
              : (result =
                  resultDigitsAfterDecimal === 0
                    ? (prevOperandNum / nextOperandNum).toPrecision(
                        largerLengthOfOperands < 12
                          ? largerLengthOfOperands
                          : 12
                      )
                    : (prevOperandNum / nextOperandNum).toFixed(
                        resultDigitsAfterDecimal < 12
                          ? resultDigitsAfterDecimal
                          : 12
                      ));
            break;
          }
          case "+": {
            result =
              resultDigitsAfterDecimal === 0
                ? (prevOperandNum + nextOperandNum).toPrecision(
                    largerLengthOfOperands < 12 ? largerLengthOfOperands : 12
                  )
                : (prevOperandNum + nextOperandNum).toFixed(
                    resultDigitsAfterDecimal < 12
                      ? resultDigitsAfterDecimal
                      : 12
                  );
            break;
          }
          case "-": {
            result =
              resultDigitsAfterDecimal === 0
                ? (prevOperandNum - nextOperandNum).toPrecision(
                    largerLengthOfOperands < 12 ? largerLengthOfOperands : 12
                  )
                : (prevOperandNum - nextOperandNum).toFixed(
                    resultDigitsAfterDecimal < 12
                      ? resultDigitsAfterDecimal
                      : 12
                  );
            break;
          }
          case "*": {
            result =
              resultDigitsAfterDecimal === 0
                ? (prevOperandNum * nextOperandNum).toPrecision(
                    largerLengthOfOperands < 12 ? largerLengthOfOperands : 12
                  )
                : (prevOperandNum * nextOperandNum).toFixed(
                    resultDigitsAfterDecimal < 12
                      ? resultDigitsAfterDecimal
                      : 12
                  );
            break;
          }
          case "=": {
            result = prevOperandStr;
            break;
          }
          default:
            result = "0";
            break;
        }
        //after switch block
        state.appState.answer = result;
        dispatch({
          type: action.app.setAnswer,
          payload: {
            state,
          },
        });

        for (let i = 0; i < 3; i += 1) state.appState.expressions.shift();
        state.appState.expressions.unshift(result);

        dispatch({
          type: action.app.setExpression,
          payload: {
            state,
          },
        });
      }
    }
  }

  return (
    <div className="grid h-full w-full grid-rows-6 gap-y-5">
      {/* history */}
      <History state={state} data-cy="history">
        {JSON.stringify(state.appState.expressions)}
      </History>

      {/* display */}
      <Display state={state} data-cy="display">
        {state.appState.answer === ""
          ? state.appState.operand
          : state.appState.answer}
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
          <OperatorBttn
            state={state}
            className="text-2xl"
            data-cy="bttn-divide"
            value="/"
            onClick={handleOperatorBttnClick}
          >
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
          <OperatorBttn
            state={state}
            className="text-3xl"
            data-cy="bttn-add"
            value="+"
            onClick={handleOperatorBttnClick}
          >
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
          <OperatorBttn
            state={state}
            className="text-3xl"
            data-cy="bttn-subtract"
            value="-"
            onClick={handleOperatorBttnClick}
          >
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
          <OperandBttn
            state={state}
            data-cy="bttn-plusMinus"
            onClick={handleToggleMinusClick}
          >
            +/-
          </OperandBttn>
          <OperatorBttn
            state={state}
            className="text-xl"
            value="*"
            data-cy="bttn-multiply"
            onClick={handleOperatorBttnClick}
          >
            X
          </OperatorBttn>
        </div>

        {/* row 5 */}
        <div className="row-span-1 grid grid-cols-4 gap-4">
          <div className="col-span-2">
            <EnterBttn
              state={state}
              onClick={handleOperatorBttnClick}
              data-cy="bttn-enter"
              value="="
            >
              =
            </EnterBttn>
          </div>

          <OperatorBttn
            state={state}
            data-cy="bttn-clear"
            className="col-span-1 text-base"
            onClick={handleClearBttnClick}
          >
            CLEAR
          </OperatorBttn>
          <OperatorBttn
            state={state}
            data-cy="bttn-backspace"
            className="col-span-1 text-2xl"
            onClick={handleBackspaceBttnClick}
          >
            ⬅
          </OperatorBttn>
        </div>
      </BttnsContainer>
    </div>
  );
}

export default Calculator;

/**
 //clears the display if the last expression was an operator
    if (state.appState.expressions.length === 2) {
      console.log("clearing operand");
      state.appState.operand = "";
      dispatch({
        type: action.app.setOperand,
        payload: {
          state,
        },
      });
    }
 */
