import tw from "tailwind-styled-components";
import { State } from "../../typings/types";

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
  py-4

  ${({
    state: {
      themeState: { $theme },
    },
  }) =>
    $theme === "theme1"
      ? "text-myWhite1Text"
      : $theme === "theme2"
      ? "text-myDarkYellow2Text"
      : "text-myLtYellow3Text"}


`;

export { Header };
