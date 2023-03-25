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
    $theme: "theme2",
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
  const {
    appState: { prevOperand, operator, nextOperand, history, result },
    themeState: { $theme },
  } = action.payload.state;

  switch (action.type) {
    case "switchTheme": {
      return {
        ...state,
        themeState: {
          $theme: $theme === "theme1" ? "theme2" : "theme1",
        },
      };
    }
    case "setPrevOperand": {
      return {
        ...state,
        appState: {
          ...state.appState,
          prevOperand,
        },
      };
    }
    case "setOperator": {
      return {
        ...state,
        appState: {
          ...state.appState,
          operator,
        },
      };
    }
    case "setNextOperand": {
      return {
        ...state,
        appState: {
          ...state.appState,
          nextOperand,
        },
      };
    }
    case "setResult": {
      return {
        ...state,
        appState: {
          ...state.appState,
          result,
        },
      };
    }
    case "setHistory": {
      return {
        ...state,
        appState: {
          ...state.appState,
          history,
        },
      };
    }
    case "setAll": {
      return {
        ...state,
        appState: {
          ...state.appState,
          prevOperand,
          operator,
          nextOperand,
          result,
          history,
        },
      };
    }

    default:
      return state;
  }
}

export { initialState, action, reducer };
