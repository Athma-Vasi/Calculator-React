import type { Action, Dispatch, State } from "../typings/types";

const initialState: State = {
  appState: {
    operand: "",
    operator: "",
    expressions: [],
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
  },
  theme: {
    switchTheme: "switchTheme",
  },
};

function reducer(state: State, action: Dispatch) {
  const clone = structuredClone(state);

  switch (action.type) {
    case "switchTheme": {
      clone.themeState.$theme = action.payload.state.themeState.$theme;
      return clone;
    }
    case "setOperand": {
      clone.appState.operand = action.payload.state.appState.operand;
      return clone;
    }
    case "setOperator": {
      clone.appState.operator = action.payload.state.appState.operator;
      return clone;
    }
    case "setExpression": {
      clone.appState.expressions = action.payload.state.appState.expressions;
      return clone;
    }

    default:
      return clone;
  }
}

export { initialState, action, reducer };
