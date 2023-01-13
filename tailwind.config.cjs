/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        //theme 1
        //background
        myBlue1MainBg: "hsl(222, 26%, 31%)",
        myBlue1ToggleBg: "hsl(223, 31%, 20%)",
        myBlue1ScreenBg: "hsl(224, 36%, 15%)",

        //keys
        myBlue1KeyBg: "hsl(225, 21%, 49%)",
        myBlue1KeyShadowBg: "hsl(224, 28%, 35%)",
        myRed1KeyToggleBg: "hsl(6, 63%, 50%)",
        myDarkRed1KeyShadowBg: "hsl(6, 70%, 34%)",
        myLtOrange1KeyBg: "hsl(30, 25%, 89%)",
        myGrayOrange1KeyShadow: "hsl(28, 16%, 65%)",

        //text
        myBlue1Text: "hsl(221, 14%, 31%)",
        myWhite1Text: "hsl(0, 0%, 100%)",

        //theme 2
        //background
        myGray2MainBg: "hsl(0, 0%, 90%)",
        myGrayRed2ToggleBg: "hsl(0, 5%, 81%)",
        myLtGrey2ScreenBg: "hsl(0, 0%, 93%)",

        //keys
        myMedCyan2KeyBg: "hsl(185, 42%, 37%)",
        myDarkCyan2KeyShadowBg: "hsl(185, 58%, 25%)",
        myLtOrange2KeyToggleBg: "hsl(25, 98%, 40%)",
        myDarkOrange2KeyShadowBg: "hsl(25, 99%, 27%)",
        myLtYellow2KeyBg: "hsl(45, 7%, 89%)",
        myDarkGrayOrange2KeyShadow: "hsl(35, 11%, 61%)",

        //text
        myDarkYellow2Text: "hsl(60, 10%, 19%)",
        myWhite2Text: "hsl(0, 0%, 100%)",

        //theme 3
        //background
        myDarkViolet3MainBg: "hsl(268, 75%, 9%)",
        myDarkViolet3ToggleBg: "hsl(268, 71%, 12%)",

        //keys
        myDarkViolet3KeyBg: "hsl(281, 89%, 26%)",
        myVividMagenta3KeyShadowBg: "hsl(285, 91%, 52%)",
        myCyan3KeyToggleBg: "hsl(176, 100%, 44%)",
        myCyan3KeyShadowBg: "hsl(177, 92%, 70%)",
        myVeryDarkViolet3KeyBg: "hsl(268, 47%, 21%)",
        myDarkMagenta3KeyShadow: "hsl(290, 70%, 36%)",

        //text
        myLtYellow3Text: "hsl(52, 100%, 62%)",
        myDarkBlue3Text: "hsl(198, 20%, 13%)",
        myWhite3Text: "hsl(0, 0%, 100%)",
      },
      gridTemplateColumns: {
        smWrapper: "11.80426fr 76.39148fr 11.80426fr",
        mdWrapper: "19.1fr 61.8fr 19.1fr",
        lgWrapper: "30.90178fr 38.19459fr 30.90178fr",
      },
      gridTemplateRows: {
        smWrapper: "11.80426fr 76.39148fr 11.80426fr",
        mdWrapper: "19.1fr 61.8fr 19.1fr",
        lgWrapper: "30.90178fr 38.19459fr 30.90178fr",
      },
    },
    screens: {
      sm: "768px",
      md: "1060px",
      lg: "1440px",
    },
    fontFamily: {
      spartan: ["League Spartan"],
    },
  },

  plugins: [],
};
