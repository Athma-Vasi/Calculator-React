import tw from "tailwind-styled-components";
import type { State } from "../../typings/types";

type OperatorBttnProps = {
  state: State;
};

const OperatorBttn = tw.button<OperatorBttnProps>`
pt-1
font-bold
text-lg
tracking-wide
rounded-lg
shadow-md 

${({
  state: {
    themeState: { $theme },
  },
}) =>
  $theme === "theme1"
    ? `bg-myBlue1KeyBg text-myWhite1Text shadow-myBlue1KeyShadowBg`
    : $theme === "theme2"
    ? `bg-myMedCyan2KeyBg text-myWhite2Text shadow-myDarkCyan2KeyShadowBg`
    : `bg-myDarkViolet3KeyBg text-myWhite3Text shadow-myVividMagenta3KeyShadowBg`}
`;

export { OperatorBttn };
