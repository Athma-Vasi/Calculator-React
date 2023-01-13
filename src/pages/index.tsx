import { type NextPage } from "next";
import { useReducer } from "react";
import Calculator from "../components/calculator";
import { useWindowSize } from "../hooks/useWindowSize";
import { Header } from "../styledTwComponents/header";
import { MainWrapper } from "../styledTwComponents/mainWrapper";
import type { Action, Dispatch, State } from "../typings/types";

const Home: NextPage = () => {
  const initialState: State = {
    appState: {
      advanced: false,
      history: [],
    },
    themeState: {
      $theme: "theme2",
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
      {/* left padding empty div */}
      <div className="col-start-1 col-end-2 row-start-1 row-end-4 outline-dotted"></div>

      <div className="col-span-1 row-start-2 row-end-3 grid grid-rows-[7] outline-dashed">
        <Header state={state}>
          <h1 className="text-4xl font-bold">calc</h1>
        </Header>

        <div className="row-span-6">
          <Calculator state={state} action={action} dispatch={dispatch} />
        </div>
      </div>

      {/* right padding empty div */}
      <div className="col-start-3 col-end-4 row-start-1 row-end-4 outline-double"></div>
    </MainWrapper>
  );
};

export default Home;
