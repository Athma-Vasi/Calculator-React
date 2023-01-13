import tw from "tailwind-styled-components";

type OperandBttnProps = {
  state: {
    themeState: {
      $theme: "theme1" | "theme2" | "theme3";
    };
  };
};

const OperandBttn = tw.button<OperandBttnProps>`
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
      ? `bg-myLtOrange1KeyBg text-myBlue1Text shadow-myGrayOrange1KeyShadow`
      : $theme === "theme2"
      ? `bg-myLtYellow2KeyBg text-myDarkYellow2Text shadow-myDarkGrayOrange2KeyShadow`
      : `bg-myVeryDarkViolet3KeyBg text-myLtYellow3Text shadow-myDarkMagenta3KeyShadow`}

`;

export { OperandBttn };
