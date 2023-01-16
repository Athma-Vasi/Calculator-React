import tw from "tailwind-styled-components";
import type { State } from "../../typings/types";

type HistoryProps = {
  state: State;
};

const History = tw.div<HistoryProps>`
  row-span-1
  rounded-lg

  h-[90px]
  text-xl
  
  flex
  items-center
  justify-end
  px-4
  py-2

  overflow-y-auto
  text-ellipsis 
  whitespace-nowrap  
  
  ${({
    state: {
      themeState: { $theme },
    },
  }) =>
    $theme === "theme1"
      ? "bg-myBlue1ScreenBg text-myWhite1Text"
      : $theme === "theme2"
      ? "bg-myLtGrey2ScreenBg text-myDarkYellow2Text"
      : "bg-myDarkViolet3ToggleBg text-myLtYellow3Text"}

`;

export { History };
