import type { Action, Dispatch, State } from "../typings/types";

const initialState: State = {
  appState: {
    advanced: false,
    history: [],
  },
  themeState: {
    $theme: "theme1",
  },
};

const action: Action = {
  switchTheme: "switchTheme",
};

function reducer(state: State, action: Dispatch) {
  const clone = structuredClone(state);

  switch (action.type) {
    case "switchTheme": {
      clone.themeState.$theme = action.payload.themeState.$theme;
      return clone;
    }
    default:
      return clone;
  }
}

export { initialState, action, reducer };
