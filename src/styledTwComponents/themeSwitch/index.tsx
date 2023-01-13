import tw from "tailwind-styled-components";
import type { State } from "../../typings/types";

type ThemeSwitchProps = {
  state: State;
};

const ThemeSwitch = tw.div<ThemeSwitchProps>`
absolute
rounded-full
cursor-pointer

mt-1
mx-2
top-0
w-4
h-4

${({
  state: {
    themeState: { $theme },
  },
}) =>
  $theme === "theme1"
    ? "left-0 bg-myRed1KeyToggleBg"
    : $theme === "theme2"
    ? "left-[22px] bg-myLtOrange2KeyToggleBg"
    : "right-0 bg-myCyan3KeyToggleBg"}


`;

export { ThemeSwitch };
