import { initial } from "cypress/types/lodash";
import { type NextPage } from "next";
import { useReducer } from "react";
import Calculator from "../components/calculator";
import { Dispatch, State } from "../typings/types";

const Home: NextPage = () => {
  const initialState: State = {
    appState: {
      advanced: false,
      history: [],
    },
    themeState: {
      theme: "theme1",
    },
  };

  const action = {
    switchToTheme1: "switchToTheme1",
    switchToTheme2: "switchToTheme2",
    switchToTheme3: "switchToTheme3",
  };

  function reducer(state: State, action: Dispatch) {
    const clone = structuredClone(state);

    return clone;
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="h-screen w-screen">
      <Calculator state={state} action={action} dispatch={dispatch} />
    </div>
  );
};

export default Home;
