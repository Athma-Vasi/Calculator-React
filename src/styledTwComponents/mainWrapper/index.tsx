import tw from "tailwind-styled-components";
import type { Action, Dispatch, State } from "../../typings/types";

type MainWrapperProps = {
  // state: State;
  // action: Action;
  // dispatch: React.Dispatch<Dispatch>;
  windowSize: {
    width: number;
    height: number;
  };
};

const MainWrapper = tw.div<MainWrapperProps>`
grid
h-screen
w-screen

${({ windowSize: { width, height } }) =>
  width < 768
    ? "grid-cols-smWrapper grid-rows-mdWrapper"
    : width < 1060
    ? "grid-cols-mdWrapper grid-rows-mdWrapper"
    : "grid-cols-lgWrapper grid-rows-smWrapper"}


`;

export { MainWrapper };
