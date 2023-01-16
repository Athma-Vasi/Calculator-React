import tw from "tailwind-styled-components";
import type { State } from "../../typings/types";

type OperandBttnProps = {
  state: State;
};

const OperandBttn = tw.button<OperandBttnProps>`
  pt-1
  font-bold
  text-2xl
  rounded-lg
  shadow-md
  truncate  
  
  active:shadow-inner
  active:translate-y-[2px]
  duration-150
  
  ${({
    state: {
      themeState: { $theme },
    },
  }) =>
    $theme === "theme1"
      ? `bg-myLtOrange1KeyBg text-myBlue1Text shadow-myGrayOrange1KeyShadow`
      : $theme === "theme2"
      ? `bg-myLtYellow2KeyBg text-myDarkYellow2Text shadow-myDarkGrayOrange2KeyShadow`
      : `bg-myVeryDarkViolet3KeyBg text-myLtYellow3Text shadow-myDarkMagenta3KeyShadow`}

`;

export { OperandBttn };
