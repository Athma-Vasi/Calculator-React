import tw from "tailwind-styled-components";
import type { State } from "../../typings/types";

type MainWrapperProps = {
  state: State;
  // action: Action;
  // dispatch: React.Dispatch<Dispatch>;
  windowsize: {
    width: number;
    height: number;
  };
};

const MainWrapper = tw.div<MainWrapperProps>`
  grid
  h-screen
  w-screen

  ${({ windowsize: { width, height } }) =>
    width < 768
      ? `grid-cols-smWrapper grid-rows-smWrapper`
      : width < 1060
      ? `grid-cols-mdWrapper grid-rows-smWrapper`
      : `grid-cols-lgWrapper grid-rows-smWrapper`}

  ${({
    state: {
      themeState: { $theme },
    },
  }) =>
    $theme === "theme1"
      ? "bg-myBlue1MainBg text-myWhite1Text"
      : $theme === "theme2"
      ? "bg-myGray2MainBg text-myDarkYellow2Text"
      : "bg-myDarkViolet3MainBg text-myLtYellow3Text"}

`;

export { MainWrapper };
