export type State = {
  appState: {
    advanced?: boolean;
    history: [];
  };
  themeState: {
    $theme: "theme1" | "theme2" | "theme3";
  };
};

export type Dispatch = {
  type: string;
  payload: State;
};

export type Action = {
  switchTheme: "switchTheme";
};
