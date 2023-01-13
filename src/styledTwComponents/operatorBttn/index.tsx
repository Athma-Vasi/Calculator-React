import tw from "tailwind-styled-components";

type OperatorBttnProps = {
  state: {
    themeState: {
      $theme: "theme1" | "theme2" | "theme3";
    };
  };
};

const OperatorBttn = tw.button<OperatorBttnProps>`
grid
place-content-center
font-bold
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
