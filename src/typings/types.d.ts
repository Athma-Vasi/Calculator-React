export type State = {
  appState: {
    prevOperand: null | string;
    operator: null | Operator;
    nextOperand: null | string;
    result: null | string;
    history: Array<string[]>;
  };
  themeState: {
    $theme: "theme1" | "theme2" | "theme3";
  };
};

export type Dispatch = {
  type: string;
  payload: {
    state: State;
  };
};

export type Action = {
  app: {
    setPrevOperand: "setPrevOperand";
    setOperator: "setOperator";
    setNextOperand: "setNextOperand";
    setAll: "setAll";
    setResult: "setResult";
    setHistory: "setHistory";
  };
  theme: {
    switchTheme: "switchTheme";
  };
};

export type Operator = "/" | "+" | "-" | "*" | "=";
