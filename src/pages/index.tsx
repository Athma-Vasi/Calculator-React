import { type NextPage } from "next";
import { useReducer } from "react";
import Calculator from "../components/calculator";
import { useWindowSize } from "../hooks/useWindowSize";
import { Header } from "../styledTwComponents/header";
import { MainWrapper } from "../styledTwComponents/mainWrapper";
import { ThemeSwitch } from "../styledTwComponents/themeSwitch";
import { ThemeSwitchBg } from "../styledTwComponents/themeSwitchBg";
import type { Action, Dispatch, State } from "../typings/types";

const Home: NextPage = () => {
  const initialState: State = {
    appState: {
      advanced: false,
      history: [],
    },
    themeState: {
      $theme: "theme3",
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
    <MainWrapper state={state} windowSize={windowSize}>
      {/* left padding empty div */}
      <div className="col-start-1 col-end-2 row-start-1 row-end-4 outline-dotted"></div>

      <div className="col-span-1 row-start-2 row-end-3 grid grid-rows-[7] outline-dashed">
        <Header state={state}>
          <h1 className="text-4xl font-bold">calc</h1>
          {/* theme */}
          <div className="flex flex-col outline-dotted">
            {/* theme nums */}
            <div className="flex w-full flex-row items-center justify-between gap-x-4 px-3 outline-dashed ">
              <p>1</p>
              <p>2</p>
              <p>3</p>
            </div>
            {/* theme switch */}
            <ThemeSwitchBg state={state}>
              <ThemeSwitch state={state}></ThemeSwitch>
            </ThemeSwitchBg>
          </div>
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
