import type { Action, Dispatch, State } from "../typings/types";

const initialState: State = {
  appState: {
    operand: "",
    operator: "",
    expressions: [],
    result: [],
  },
  themeState: {
    $theme: "theme1",
  },
};

const action: Action = {
  app: {
    setOperand: "setOperand",
    setOperator: "setOperator",
    setExpression: "setExpression",
    setResult: "setResult",
  },
  theme: {
    switchTheme: "switchTheme",
  },
};

function reducer(state: State, action: Dispatch) {
  // deep clone the state object
  const clone = structuredClone(state);
  const {
    appState: { operand, operator, expressions },
    themeState: { $theme },
  } = action.payload.state;

  switch (action.type) {
    case "switchTheme": {
      clone.themeState.$theme = $theme;
      return clone;
    }
    case "setOperand": {
      clone.appState.operand = operand;
      return clone;
    }
    case "setOperator": {
      clone.appState.operator = operator;
      return clone;
    }
    case "setExpression": {
      clone.appState.expressions = expressions;
      return clone;
    }

    default:
      return clone;
  }
}

export { initialState, action, reducer };
