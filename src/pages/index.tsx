import { type NextPage } from "next";
import React, { useReducer } from "react";
import Calculator from "../components/calculator";
import { useWindowSize } from "../hooks/useWindowSize";
import { action, initialState, reducer } from "../state";

import { Header } from "../styledTwComponents/header";
import { MainWrapper } from "../styledTwComponents/mainWrapper";
import { ThemeSwitch } from "../styledTwComponents/themeSwitch";
import { ThemeSwitchBg } from "../styledTwComponents/themeSwitchBg";

const Home: NextPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const windowDims = useWindowSize();
  const windowsize = (function () {
    const { width = 0, height = 0 } = windowDims;

    return {
      width,
      height,
    };
  })();

  function handleThemeSwitchClick(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    const currentTheme = state.themeState.$theme;
    const newTheme =
      currentTheme === "theme1"
        ? "theme2"
        : currentTheme === "theme2"
        ? "theme3"
        : "theme1";
    state.themeState.$theme = newTheme;

    dispatch({
      type: action.theme.switchTheme,
      payload: {
        state,
      },
    });
  }

  return (
    <MainWrapper state={state} windowsize={windowsize}>
      {/* left padding empty div */}
      <div className="col-span-1 row-start-1 row-end-4 "></div>

      <div className="col-span-1 row-start-2 row-end-3 grid grid-rows-[7] ">
        <Header state={state}>
          <h1 className="text-4xl font-bold">calc</h1>
          {/* theme */}
          <div className="flex flex-col ">
            {/* theme nums */}
            <div className="flex w-full flex-row items-center justify-between gap-x-4 px-3  ">
              <p>1</p>
              <p>2</p>
              <p>3</p>
            </div>
            {/* theme switch */}
            <ThemeSwitchBg state={state}>
              <ThemeSwitch
                state={state}
                onClick={handleThemeSwitchClick}
                data-cy="theme-switch"
              ></ThemeSwitch>
            </ThemeSwitchBg>
          </div>
        </Header>

        <div className="row-span-6">
          <Calculator state={state} action={action} dispatch={dispatch} />
        </div>
      </div>

      {/* right padding empty div */}
      <div className="col-span-1 row-start-1 row-end-4 "></div>
    </MainWrapper>
  );
};

export default Home;
