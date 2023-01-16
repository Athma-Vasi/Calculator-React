import tw from "tailwind-styled-components";
import type { State } from "../../typings/types";

type EnterBttnProps = {
  state: State;
};

const EnterBttn = tw.button<EnterBttnProps>`
  pt-1
  font-bold
  text-3xl
  tracking-wide
  rounded-lg
  shadow-md
  w-full 
  h-full

  active:shadow-inner
  active:translate-y-[2px]
  duration-150

  ${({
    state: {
      themeState: { $theme },
    },
  }) =>
    $theme === "theme1"
      ? `bg-myRed1KeyToggleBg shadow-myDarkRed1KeyShadowBg text-myWhite1Text`
      : $theme === "theme2"
      ? `bg-myLtOrange2KeyToggleBg shadow-myDarkOrange2KeyShadowBg text-myWhite2Text`
      : `bg-myCyan3KeyShadowBg shadow-myCyan3KeyShadowBg text-myDarkBlue3Text`}

`;

export { EnterBttn };
