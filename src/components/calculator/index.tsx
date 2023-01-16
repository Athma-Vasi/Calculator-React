import React from "react";
import type { Action, Dispatch, Operator, State } from "../../typings/types";

import { BttnsContainer } from "../../styledTwComponents/bttnsContainer";
import { Display } from "../../styledTwComponents/display";
import { EnterBttn } from "../../styledTwComponents/enterBttn";
import { History } from "../../styledTwComponents/history";
import { OperandBttn } from "../../styledTwComponents/operandBttn";
import { OperatorBttn } from "../../styledTwComponents/operatorBttn";
import { String } from "cypress/types/lodash";

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
    const value = event.currentTarget.value;
  }

  function handleToggleMinusClick() {
    // event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    const currentValue =
      state.appState.nextOperand === null
        ? state.appState.prevOperand
        : state.appState.nextOperand;

    if (currentValue !== null) {
      if (!currentValue.includes("-")) {
        state.appState.nextOperand === null
          ? (state.appState.prevOperand = `-${currentValue}`)
          : (state.appState.nextOperand = `-${currentValue}`);

        dispatch({
          type:
            state.appState.nextOperand === null
              ? action.app.setPrevOperand
              : action.app.setNextOperand,
          payload: { state },
        });
      } else {
        state.appState.nextOperand === null
          ? (state.appState.prevOperand = currentValue.slice(1))
          : (state.appState.nextOperand = currentValue.slice(1));

        dispatch({
          type:
            state.appState.nextOperand === null
              ? action.app.setPrevOperand
              : action.app.setNextOperand,
          payload: { state },
        });
      }
    }
  }

  function handleClearBttnClick() {
    // event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    state.appState.prevOperand = null;
    state.appState.operator = null;
    state.appState.nextOperand = null;
    state.appState.result = null;
    dispatch({
      type: action.app.setAll,
      payload: { state },
    });
  }

  function handleBackspaceBttnClick() {
    // event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    const currentValue =
      state.appState.nextOperand === null
        ? state.appState.prevOperand
        : state.appState.nextOperand;

    if (currentValue !== null) {
      const newValue = currentValue.slice(0, -1);
      state.appState.nextOperand === null
        ? (state.appState.prevOperand = newValue)
        : (state.appState.nextOperand = newValue);

      dispatch({
        type:
          state.appState.nextOperand === null
            ? action.app.setPrevOperand
            : action.app.setNextOperand,
        payload: { state },
      });
    }
  }

  function handleOperandBttnClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const number = event.currentTarget.value;

    if (state.appState.prevOperand === null) {
      state.appState.prevOperand = `${number}`;
      dispatch({
        type: action.app.setPrevOperand,
        payload: { state },
      });
    } else if (
      state.appState.operator === null &&
      state.appState.nextOperand === null
    ) {
      state.appState.prevOperand = `${state.appState.prevOperand}${number}`;
      dispatch({
        type: action.app.setPrevOperand,
        payload: { state },
      });
    } else if (
      state.appState.prevOperand !== null &&
      state.appState.operator !== null &&
      state.appState.nextOperand === null
    ) {
      state.appState.nextOperand = `${number}`;
      dispatch({
        type: action.app.setNextOperand,
        payload: { state },
      });
    } else if (
      state.appState.prevOperand !== null &&
      state.appState.operator !== null &&
      state.appState.nextOperand !== null
    ) {
      state.appState.nextOperand = `${state.appState.nextOperand}${number}`;
      dispatch({
        type: action.app.setNextOperand,
        payload: { state },
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
      payload: { state },
    });

    if (
      state.appState.prevOperand === null &&
      state.appState.nextOperand === null &&
      state.appState.history.length !== 0
    ) {
      if (
        state.appState.history[state.appState.history.length - 1] !== undefined
      ) {
        const history = state.appState.history[
          state.appState.history.length - 1
        ] as string[];

        state.appState.prevOperand = history[4] as string;
        dispatch({
          type: action.app.setPrevOperand,
          payload: { state },
        });
      }
    }

    if (
      state.appState.prevOperand !== null &&
      state.appState.nextOperand !== null &&
      state.appState.operator !== null
    ) {
      const { prevOperand, operator, nextOperand } = state.appState;
      const result = calculate(prevOperand, operator, nextOperand);

      //only add to history if prevOperand, operator, and nextOperand are not null
      state.appState.history.push([
        prevOperand,
        operator,
        nextOperand,
        "=",
        `${result}`,
      ]);
      dispatch({
        type: action.app.setHistory,
        payload: { state },
      });

      state.appState.prevOperand = null;
      state.appState.nextOperand = null;
      state.appState.operator = null;
      state.appState.result = result.toString();
      dispatch({
        type: action.app.setAll,
        payload: { state },
      });
    }
  }

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
        return prevOperand_ / nextOperand_;
      default:
        return 0;
    }
  }

  function handleEnterBttnClick() {
    // event: React.MouseEvent<HTMLButtonElement>
    if (
      state.appState.prevOperand !== null &&
      state.appState.nextOperand !== null &&
      state.appState.operator !== null
    ) {
      const { prevOperand, operator, nextOperand } = state.appState;
      const result = calculate(prevOperand, operator, nextOperand);

      //only add to history if prevOperand, operator, and nextOperand are not null
      state.appState.history.push([
        prevOperand,
        operator,
        nextOperand,
        "=",
        `${result}`,
      ]);
      dispatch({
        type: action.app.setHistory,
        payload: { state },
      });

      state.appState.prevOperand = null;
      state.appState.nextOperand = null;
      state.appState.operator = null;
      state.appState.result = result.toString();
      dispatch({
        type: action.app.setAll,
        payload: { state },
      });
    }
  }

  return (
    <div className="grid h-full w-full grid-rows-6 gap-y-5">
      {/* history */}
      <History state={state} data-cy="history">
        {JSON.stringify(state.appState.history)}
      </History>

      {/* display */}
      <Display state={state} data-cy="display">
        {state.appState.result &&
        state.appState.nextOperand &&
        state.appState.prevOperand === null
          ? state.appState.nextOperand
          : state.appState.result &&
            state.appState.prevOperand &&
            state.appState.nextOperand === null
          ? state.appState.prevOperand
          : state.appState.prevOperand === null &&
            state.appState.nextOperand === null &&
            state.appState.result
          ? state.appState.result
          : state.appState.result &&
            state.appState.prevOperand &&
            state.appState.nextOperand
          ? state.appState.nextOperand
          : state.appState.result ??
            state.appState.nextOperand ??
            state.appState.prevOperand ??
            state.appState.nextOperand}
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
              onClick={handleEnterBttnClick}
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
 if (state.appState.expressions.length > 2) {
        const operators = "+*-/";
        const [prevOperandStr, operator, nextOperandStr] =
          state.appState.expressions.slice(0, 3) as [
            string,
            Operator | "",
            string
          ];

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

          state.appState.history.push([
            prevOperandStr,
            operator,
            nextOperandStr,
            result,
          ]);

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
 */
