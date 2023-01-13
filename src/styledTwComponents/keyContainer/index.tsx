import tw from "tailwind-styled-components";

type KeyContainerProps = {
  state: {
    themeState: {
      $theme: "theme1" | "theme2" | "theme3";
    };
  };
};

const KeyContainer = tw.div`
  min-w-min
`;
