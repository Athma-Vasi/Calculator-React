import type { Action, Dispatch, State } from "../typings/types";

const initialState: State = {
  appState: {
    prevOperand: null,
    operator: null,
    nextOperand: null,
    result: null,
    history: [],
  },
  themeState: {
    $theme: "theme1",
  },
};

const action: Action = {
  app: {
    setPrevOperand: "setPrevOperand",
    setOperator: "setOperator",
    setNextOperand: "setNextOperand",
    setResult: "setResult",
    setHistory: "setHistory",
    setAll: "setAll",
  },
  theme: {
    switchTheme: "switchTheme",
  },
};

function reducer(state: State, action: Dispatch) {
  // deep clone the state object
  const clone = structuredClone(state);
  const {
    appState: { prevOperand, operator, nextOperand, history, result },
    themeState: { $theme },
  } = action.payload.state;

  switch (action.type) {
    case "switchTheme": {
      clone.themeState.$theme = $theme;
      return clone;
    }
    case "setPrevOperand": {
      clone.appState.prevOperand = prevOperand;
      return clone;
    }
    case "setOperator": {
      clone.appState.operator = operator;
      return clone;
    }
    case "setNextOperand": {
      clone.appState.nextOperand = nextOperand;
      return clone;
    }
    case "setResult": {
      clone.appState.result = result;
      return clone;
    }
    case "setHistory": {
      clone.appState.history = history;
      return clone;
    }
    case "setAll": {
      clone.appState.prevOperand = prevOperand;
      clone.appState.operator = operator;
      clone.appState.nextOperand = nextOperand;
      clone.appState.result = result;
      clone.appState.history = history;

      return clone;
    }

    default:
      return clone;
  }
}

export { initialState, action, reducer };
