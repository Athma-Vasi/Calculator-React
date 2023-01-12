import tw from "tailwind-styled-components";

type OperatorBttnProps = {
  state: {
    themeState: {
      theme: "theme1" | "theme2" | "theme3";
    };
  };
};

const OperatorBttn = tw.button<OperatorBttnProps>`

`;

export { OperatorBttn };
