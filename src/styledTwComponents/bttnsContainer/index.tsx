import tw from "tailwind-styled-components";
import type { State } from "../../typings/types";

type BttnsContainerProps = {
  state: State;
};

const BttnsContainer = tw.div<BttnsContainerProps>`
  grid 
  row-span-4 
  grid-rows-5 
  gap-y-4
  p-4
  rounded-lg

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

export { BttnsContainer };
