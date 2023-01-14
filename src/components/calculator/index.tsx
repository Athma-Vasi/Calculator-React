import React, { useState } from "react";
import { BttnsContainer } from "../../styledTwComponents/bttnsContainer";
import { Display } from "../../styledTwComponents/display";
import { EnterBttn } from "../../styledTwComponents/enterBttn";
import { History } from "../../styledTwComponents/history";
import { OperandBttn } from "../../styledTwComponents/operandBttn";
import { OperatorBttn } from "../../styledTwComponents/operatorBttn";
import type { Action, Dispatch, Operator, State } from "../../typings/types";

type CalculatorProps = {
  state: State;
  action: Action;
  dispatch: React.Dispatch<Dispatch>;
};

function Calculator({ state, action, dispatch }: CalculatorProps) {
  const [operand, setOperand] = useState("");
  const [operator, setOperator] = useState("");
  const [expressionArr, setExpressionArr] = useState<(Operator | string)[]>([]);

  function handleDecimalBttnClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const value = event.currentTarget.value;
    if (!operand.includes(".")) {
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

  function handleToggleMinusClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
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

  function handleClearBttnClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    // setOperand("");
    state.appState.operand = "";

    dispatch({
      type: action.app.setOperand,
      payload: {
        state,
      },
    });
  }

  function handleBackspaceBttnClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
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
    // if (operand.length < 13) setOperand((prev) => `${prev}${number}`);
    if (operand.length < 13) {
      const newValue = `${state.appState.operand}${number}`;
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
  }

  return (
    <div className="grid h-full w-full grid-rows-6 gap-y-5">
      {/* history */}
      <History state={state}>
        {JSON.stringify(state.appState.expressions)}
      </History>

      {/* display */}
      <Display state={state} data-cy="display">
        {state.appState.operand}
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
            <EnterBttn state={state} type="submit">
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
 function handleOperatorBttnClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    //something
    const operator_ = event.currentTarget.value as Operator;
    console.log("operator at start", operator_);
    const operand_ = operand;
    setOperator(operator_);

    const clone = structuredClone(expressionArr);
    clone.push(operand_);
    clone.push(operator_);
    setExpressionArr(clone);

    setOperand("");

    console.log("expArr before switch", expressionArr);

    //start evaluating expression when there are 3 items:
    //[operand, operator, operand]
    if (expressionArr.length > 3) {
      //'as' is justifiable here cuz values cannot be undefined as this block will only be entered when there are three values
      const [prevOperandStr, currOperator, nextOperandStr] =
        expressionArr.slice(0, 3) as [string, Operator, string];
      console.log(prevOperandStr, currOperator, nextOperandStr);

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

      // console.log(prevOperandDigitsAfterDecimal, nextOperandDigitsAfterDecimal);

      //choose the smallest value of digits after decimal
      const resultDigitsAfterDecimal =
        prevOperandDigitsAfterDecimal > nextOperandDigitsAfterDecimal
          ? nextOperandDigitsAfterDecimal
          : prevOperandDigitsAfterDecimal;

      let result = "";
      const prevOperandNum = Number(prevOperandStr);
      const nextOperandNum = Number(nextOperandStr);

      switch (currOperator) {
        case "/": {
          result =
            resultDigitsAfterDecimal === 0
              ? (prevOperandNum / nextOperandNum).toPrecision(
                  largerLengthOfOperands
                )
              : (prevOperandNum / nextOperandNum).toFixed(
                  resultDigitsAfterDecimal
                );
          //shift result into expressionArr after removing first 3 items
          //clone is locally scoped here
          const clone = structuredClone(expressionArr);
          console.log("clone before shift", clone);
          for (let i = 0; i < 3; i += 1) clone.shift();
          console.log("clone after shift", clone);
          clone.unshift(result);
          setOperand(result);
          setExpressionArr(clone);
          break;
        }
      }
    }
  }
 */
