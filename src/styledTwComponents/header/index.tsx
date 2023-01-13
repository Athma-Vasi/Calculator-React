import tw from "tailwind-styled-components";
import type { State } from "../../typings/types";

type HeaderProps = {
  state: State;
};

const Header = tw.div<HeaderProps>`
  row-span-1 
  flex 
  flex-row 
  items-center 
  justify-between 
  px-6 
  py-2  

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

export { Header };
