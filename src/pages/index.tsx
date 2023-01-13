import { type NextPage } from "next";
import { useReducer } from "react";
import Calculator from "../components/calculator";
import { useWindowSize } from "../hooks/useWindowSize";
import { MainWrapper } from "../styledTwComponents/mainWrapper";
import type { Action, Dispatch, State } from "../typings/types";

const Home: NextPage = () => {
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
    switchToTheme1: "switchToTheme1",
    switchToTheme2: "switchToTheme2",
    switchToTheme3: "switchToTheme3",
  };

  function reducer(state: State, action: Dispatch) {
    const clone = structuredClone(state);

    return clone;
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const windowDims = useWindowSize();
  const windowSize = (function () {
    const { width = 0, height = 0 } = windowDims;

    return {
      width,
      height,
    };
  })();

  return (
    <MainWrapper windowSize={windowSize}>
      <div className="col-start-1 col-end-2 row-start-1 row-end-4 outline-dotted"></div>

      <div className="col-span-1 row-start-2 row-end-3 outline-dashed">
        <Calculator state={state} action={action} dispatch={dispatch} />
      </div>
      <div className="col-start-3 col-end-4 row-start-1 row-end-4 outline-double"></div>
    </MainWrapper>
  );
};

export default Home;
