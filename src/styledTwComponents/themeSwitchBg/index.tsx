import tw from "tailwind-styled-components";
import type { State } from "../../typings/types";

type ThemeSwitchBgProps = {
  state: State;
};

const ThemeSwitchBg = tw.div<ThemeSwitchBgProps>`
  relative 
  h-6 
  w-full 
  rounded-full

  ${({
    state: {
      themeState: { $theme },
    },
  }) =>
    $theme === "theme1"
      ? "bg-myBlue1ToggleBg"
      : $theme === "theme2"
      ? "bg-myGrayRed2ToggleBg"
      : "bg-myDarkViolet3ToggleBg"}

`;

export { ThemeSwitchBg };
