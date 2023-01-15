export type State = {
  appState: {
    operand: string;
    operator: Operator | "";
    expressions: string[];
    answer: string;
    history: string[][];
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
    setOperand: "setOperand";
    setOperator: "setOperator";
    setExpression: "setExpression";
    setAnswer: "setAnswer";
    setHistory: "setHistory";
  };
  theme: {
    switchTheme: "switchTheme";
  };
};

export type Operator = "/" | "+" | "-" | "*" | "=";
