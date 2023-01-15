import { mount } from "cypress/react18";

describe("Theme switching", () => {
  it("should have switch in first position at initial visit", () => {
    cy.visit("http://localhost:3000/");

    cy.get("[data-cy='theme-switch']").should("have.class", "left-0");
  });

  it("should move switch to corresponding positions after clicks", () => {
    cy.visit("http://localhost:3000/");

    //first click changes to 2nd position
    const themeSwitch = cy.get("[data-cy='theme-switch']");
    themeSwitch.click();
    themeSwitch.should("have.class", "left-[22px]");

    //second click changes to 3rd position
    themeSwitch.click();
    themeSwitch.should("have.class", "right-0");

    //third click changes to first position
    themeSwitch.click();
    themeSwitch.should("have.class", "left-0");
  });
});

describe("Display Numbers", () => {
  it("should display numbers when clicked", () => {
    cy.visit("http://localhost:3000/");

    //bttn 7 displays 7
    cy.get("[data-cy='bttn-7']").click();
    cy.get("[data-cy='display']").should("contain.text", "7");

    //bttn 8 displays 8
    cy.get("[data-cy='bttn-8']").click();
    cy.get("[data-cy='display']").should("contain.text", "8");

    //bttn 9 displays 9
    cy.get("[data-cy='bttn-9']").click();
    cy.get("[data-cy='display']").should("contain.text", "9");

    //bttn 4 displays 4
    cy.get("[data-cy='bttn-4']").click();
    cy.get("[data-cy='display']").should("contain.text", "4");

    //bttn 5 displays 5
    cy.get("[data-cy='bttn-5']").click();
    cy.get("[data-cy='display']").should("contain.text", "5");

    //bttn 6 displays 6
    cy.get("[data-cy='bttn-6']").click();
    cy.get("[data-cy='display']").should("contain.text", "6");

    //bttn 1 displays 1
    cy.get("[data-cy='bttn-1']").click();
    cy.get("[data-cy='display']").should("contain.text", "1");

    //bttn 2 displays 2
    cy.get("[data-cy='bttn-2']").click();
    cy.get("[data-cy='display']").should("contain.text", "2");

    //bttn 3 displays 3
    cy.get("[data-cy='bttn-3']").click();
    cy.get("[data-cy='display']").should("contain.text", "3");

    //bttn 0 displays 0
    cy.get("[data-cy='bttn-0']").click();
    cy.get("[data-cy='display']").should("contain.text", "0");

    //the above sequence of clicks should result in...
    cy.get("[data-cy='display']").should("contain.text", "7894561230");
  });
});

describe("Display decimal", () => {
  it("displays decimal only once upon click", () => {
    cy.visit("http://localhost:3000/");

    //should display decimal after click
    cy.get("[data-cy='bttn-decimal']").click();
    cy.get("[data-cy='display']").should("contain.text", ".");

    //should not display decimal twice after two clicks
    cy.get("[data-cy='bttn-decimal']").click();
    cy.get("[data-cy='display']").should("not.contain", "..");
  });
});

describe("Toggle minus symbol", () => {
  it("toggles minus symbol upon clicks", () => {
    cy.visit("http://localhost:3000/");

    //should display '-' after first click
    cy.get("[data-cy='bttn-plusMinus']").click();
    cy.get("[data-cy='display']").should("contain.text", "-");

    //should not display '-' after second click
    cy.get("[data-cy='bttn-plusMinus']").click();
    cy.get("[data-cy='display']").should("not.contain.text", "-");

    //should correctly toggle minus symbol with numbers present
    for (let i = 0; i < 5; i += 1) cy.get("[data-cy='bttn-3']").click();
    cy.get("[data-cy='bttn-plusMinus']").click();
    cy.get("[data-cy='display']").should("contain.text", "-");
    cy.get("[data-cy='bttn-plusMinus']").click();
    cy.get("[data-cy='display']").should("not.contain.text", "-");
  });
});

describe("Clear screen", () => {
  it("should clear screen upon click", () => {
    cy.visit("http://localhost:3000/");

    //should clear display screen of five '5's after click
    for (let i = 0; i < 5; i += 1) cy.get("[data-cy='bttn-5']").click();
    cy.get("[data-cy='bttn-clear']").click();
    cy.get("[data-cy='display']").should("be.empty");
  });
});

describe("Backspace functionality", () => {
  it("should delete last char entered", () => {
    cy.visit("http://localhost:3000/");

    //should remove last entered char when backspace bttn is clicked
    for (let i = 0; i < 7; i += 1) cy.get("[data-cy='bttn-7']").click();
    cy.get("[data-cy='bttn-backspace']").click();
    cy.get("[data-cy='display']").should("contain.text", "777777");
  });

  it("should not delete '-' if it's the only char present", () => {
    cy.visit("http://localhost:3000/");

    cy.get("[data-cy='bttn-plusMinus']").click();
    cy.get("[data-cy='display']").should("contain.text", "-");
  });

  it("should not delete '-' if it's the first char present", () => {
    cy.visit("http://localhost:3000/");

    cy.get("[data-cy='bttn-5']").click();
    cy.get("[data-cy='bttn-plusMinus']").click();
    cy.get("[data-cy='bttn-backspace']").click();
    cy.get("[data-cy='display']").should("contain.text", "-");
  });
});

describe("Addition functionality", () => {
  it("should add two numbers", () => {
    cy.visit("http://localhost:3000/");

    //should add two numbers
    cy.get("[data-cy='bttn-5']").click();
    cy.get("[data-cy='bttn-add']").click();
    cy.get("[data-cy='bttn-5']").click();
    cy.get("[data-cy='bttn-enter']").click();
    cy.get("[data-cy='display']").should("contain.text", "10");
  });

  it("should add two numbers with decimal", () => {
    cy.visit("http://localhost:3000/");

    //should add two numbers with decimal
    cy.get("[data-cy='bttn-5']").click();
    cy.get("[data-cy='bttn-decimal']").click();
    cy.get("[data-cy='bttn-5']").click();
    cy.get("[data-cy='bttn-add']").click();
    cy.get("[data-cy='bttn-5']").click();
    cy.get("[data-cy='bttn-decimal']").click();
    cy.get("[data-cy='bttn-5']").click();
    cy.get("[data-cy='bttn-enter']").click();
    cy.get("[data-cy='display']").should("contain.text", "11.0");
  });

  it("should add two numbers with minus symbol", () => {
    cy.visit("http://localhost:3000/");

    //should add two numbers with minus symbol
    cy.get("[data-cy='bttn-plusMinus']").click();
    cy.get("[data-cy='bttn-5']").click();
    cy.get("[data-cy='bttn-add']").click();
    cy.get("[data-cy='bttn-5']").click();
    cy.get("[data-cy='bttn-enter']").click();
    cy.get("[data-cy='display']").should("contain.text", "0");
  });

  it("should add two numbers with minus symbol and decimal", () => {
    cy.visit("http://localhost:3000/");

    //should add two numbers with minus symbol and decimal
    cy.get("[data-cy='bttn-plusMinus']").click();
    cy.get("[data-cy='bttn-5']").click();
    cy.get("[data-cy='bttn-decimal']").click();
    cy.get("[data-cy='bttn-5']").click();
    cy.get("[data-cy='bttn-add']").click();
    cy.get("[data-cy='bttn-5']").click();
    cy.get("[data-cy='bttn-decimal']").click();
    cy.get("[data-cy='bttn-5']").click();
    cy.get("[data-cy='bttn-enter']").click();
    cy.get("[data-cy='display']").should("contain.text", "0.0");
  });
});

describe("Subtraction functionality", () => {
  it("should subtract two numbers", () => {
    cy.visit("http://localhost:3000/");

    //should subtract two numbers
    cy.get("[data-cy='bttn-5']").click();
    cy.get("[data-cy='bttn-subtract']").click();
    cy.get("[data-cy='bttn-5']").click();
    cy.get("[data-cy='bttn-enter']").click();
    cy.get("[data-cy='display']").should("contain.text", "0.0");
  });

  it("should subtract two numbers with decimal", () => {
    cy.visit("http://localhost:3000/");

    //should subtract two numbers with decimal
    cy.get("[data-cy='bttn-5']").click();
    cy.get("[data-cy='bttn-decimal']").click();
    cy.get("[data-cy='bttn-5']").click();
    cy.get("[data-cy='bttn-subtract']").click();
    cy.get("[data-cy='bttn-5']").click();
    cy.get("[data-cy='bttn-decimal']").click();
    cy.get("[data-cy='bttn-5']").click();
    cy.get("[data-cy='bttn-enter']").click();
    cy.get("[data-cy='display']").should("contain.text", "0.0");
  });

  it("should subtract two numbers with minus symbol", () => {
    cy.visit("http://localhost:3000/");

    //should subtract two numbers with minus symbol
    cy.get("[data-cy='bttn-plusMinus']").click();
    cy.get("[data-cy='bttn-5']").click();
    cy.get("[data-cy='bttn-subtract']").click();
    cy.get("[data-cy='bttn-5']").click();
    cy.get("[data-cy='bttn-enter']").click();
    cy.get("[data-cy='display']").should("contain.text", "-10.0");
  });

  it("should subtract two numbers with minus symbol and decimal", () => {
    cy.visit("http://localhost:3000/");

    //should subtract two numbers with minus symbol and decimal
    cy.get("[data-cy='bttn-plusMinus']").click();
    cy.get("[data-cy='bttn-5']").click();
    cy.get("[data-cy='bttn-decimal']").click();
    cy.get("[data-cy='bttn-5']").click();
    cy.get("[data-cy='bttn-subtract']").click();
    cy.get("[data-cy='bttn-5']").click();
    cy.get("[data-cy='bttn-decimal']").click();
    cy.get("[data-cy='bttn-5']").click();
    cy.get("[data-cy='bttn-enter']").click();
    cy.get("[data-cy='display']").should("contain.text", "-11.0");
  });
});

describe("Division functionality", () => {
  it("should divide two numbers", () => {
    cy.visit("http://localhost:3000/");

    //should divide two numbers
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-divide"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "1.0");
  });

  it("should divide two numbers with decimal", () => {
    cy.visit("http://localhost:3000/");

    //should divide two numbers with decimal
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-decimal"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-divide"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-decimal"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "1.0");
  });

  it("should divide two numbers with minus symbol", () => {
    cy.visit("http://localhost:3000/");

    //should divide two numbers with minus symbol
    cy.get('[data-cy="bttn-plusMinus"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-divide"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "-1.0");
  });

  it("should divide two numbers with minus symbol and decimal", () => {
    cy.visit("http://localhost:3000/");

    //should divide two numbers with minus symbol and decimal
    cy.get('[data-cy="bttn-plusMinus"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-decimal"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-divide"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-decimal"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "-1.0");
  });

  it("should divide two numbers with zero", () => {
    cy.visit("http://localhost:3000/");

    //should divide two numbers with zero
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-divide"]').click();
    cy.get('[data-cy="bttn-0"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "Error: Divide by 0");
  });

  //test for divide by zero then another operation
  it("should divide two numbers with zero then another operation", () => {
    cy.visit("http://localhost:3000/");

    //should divide two numbers with zero then another operation
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-divide"]').click();
    cy.get('[data-cy="bttn-0"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "Error: Divide by 0");
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-add"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "10");
  });

  it("should divide two numbers with zero then clear", () => {
    cy.visit("http://localhost:3000/");

    //should divide two numbers with zero then clear
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-divide"]').click();
    cy.get('[data-cy="bttn-0"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "Error: Divide by 0");
    cy.get('[data-cy="bttn-clear"]').click();
    cy.get('[data-cy="display"]').should("not.contain.text");
  });

  it("should divide two numbers with zero then clear then another operation", () => {
    cy.visit("http://localhost:3000/");

    //should divide two numbers with zero then clear then another operation
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-divide"]').click();
    cy.get('[data-cy="bttn-0"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "Error: Divide by 0");
    cy.get('[data-cy="bttn-clear"]').click();
    cy.get('[data-cy="display"]').should("not.contain.text");
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-add"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "10");
  });

  it("should divide two numbers with zero then clear then another operation then clear", () => {
    cy.visit("http://localhost:3000/");

    //should divide two numbers with zero then clear then another operation then clear
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-divide"]').click();
    cy.get('[data-cy="bttn-0"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "Error: Divide by 0");
    cy.get('[data-cy="bttn-clear"]').click();
    cy.get('[data-cy="display"]').should("not.contain.text");
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-add"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "10");
    cy.get('[data-cy="bttn-clear"]').click();
    cy.get('[data-cy="display"]').should("not.contain.text");
  });

  it("should divide two numbers with zero then clear then another operation then clear then divide two numbers with zero then clear then another operation", () => {
    cy.visit("http://localhost:3000/");

    //should divide two numbers with zero then clear then another operation then clear then divide two numbers with zero then clear then another operation
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-divide"]').click();
    cy.get('[data-cy="bttn-0"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "Error: Divide by 0");
    cy.get('[data-cy="bttn-clear"]').click();
    cy.get('[data-cy="display"]').should("not.contain.text");
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-add"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "10");
    cy.get('[data-cy="bttn-clear"]').click();
    cy.get('[data-cy="display"]').should("not.contain.text");
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-divide"]').click();
    cy.get('[data-cy="bttn-0"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "Error: Divide by 0");
    cy.get('[data-cy="bttn-clear"]').click();
    cy.get('[data-cy="display"]').should("not.contain.text");
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-add"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "10");
  });
});

describe("Multiplication functionality", () => {
  it("should multiply two numbers", () => {
    cy.visit("http://localhost:3000/");

    //should multiply two numbers
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-multiply"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "25");
  });

  it("should multiply two numbers then clear", () => {
    cy.visit("http://localhost:3000/");

    //should multiply two numbers then clear
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-multiply"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "25");
    cy.get('[data-cy="bttn-clear"]').click();
    cy.get('[data-cy="display"]').should("not.contain.text");
  });

  it("should multiply two numbers then clear then another operation", () => {
    cy.visit("http://localhost:3000/");

    //should multiply two numbers then clear then another operation
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-multiply"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "25");
    cy.get('[data-cy="bttn-clear"]').click();
    cy.get('[data-cy="display"]').should("not.contain.text");
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-add"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "10");
  });

  it("should multiply two numbers then clear then divide by zero then clear", () => {
    cy.visit("http://localhost:3000/");

    //should multiply two numbers then clear then divide by zero then clear
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-multiply"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "25");
    cy.get('[data-cy="bttn-clear"]').click();
    cy.get('[data-cy="display"]').should("not.contain.text");
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-divide"]').click();
    cy.get('[data-cy="bttn-0"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "Error: Divide by 0");
    cy.get('[data-cy="bttn-clear"]').click();
    cy.get('[data-cy="display"]').should("not.contain.text");
  });

  it("should multiply two numbers then clear then divide by zero then clear then another operation", () => {
    cy.visit("http://localhost:3000/");

    //should multiply two numbers then clear then divide by zero then clear then another operation
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-multiply"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "25");
    cy.get('[data-cy="bttn-clear"]').click();
    cy.get('[data-cy="display"]').should("not.contain.text");
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-divide"]').click();
    cy.get('[data-cy="bttn-0"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "Error: Divide by 0");
    cy.get('[data-cy="bttn-clear"]').click();
    cy.get('[data-cy="display"]').should("not.contain.text");
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-add"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "10");
  });

  it("should multiply two numbers then clear then divide by zero then clear then another operation then clear", () => {
    cy.visit("http://localhost:3000/");

    //should multiply two numbers then clear then divide by zero then clear then another operation then clear
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-multiply"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "25");
    cy.get('[data-cy="bttn-clear"]').click();
    cy.get('[data-cy="display"]').should("not.contain.text");
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-divide"]').click();
    cy.get('[data-cy="bttn-0"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "Error: Divide by 0");
    cy.get('[data-cy="bttn-clear"]').click();
    cy.get('[data-cy="display"]').should("not.contain.text");
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-add"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "10");
    cy.get('[data-cy="bttn-clear"]').click();
    cy.get('[data-cy="display"]').should("not.contain.text");
  });
});

describe("Multiple operations chained together", () => {
  it("should enter a number then backspace then enter decimal then click add then enter a number then click enter", () => {
    cy.visit("http://localhost:3000/");

    //should enter a number then backspace then enter decimal then click add then enter a number then click enter
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-backspace"]').click();
    cy.get('[data-cy="bttn-decimal"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-add"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "5.50");
  });

  it("should enter a number then backspace then enter decimal then click add then enter a number then click enter then clear", () => {
    cy.visit("http://localhost:3000/");

    //should enter a number then backspace then enter decimal then click add then enter a number then click enter then clear
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-backspace"]').click();
    cy.get('[data-cy="bttn-decimal"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-add"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "5.50");
    cy.get('[data-cy="bttn-clear"]').click();
    cy.get('[data-cy="display"]').should("not.contain.text");
  });

  it("should enter numbers then backspace then enter decimal then click divide then enter numbers then backspace then enter decimal then click enter then clear", () => {
    cy.visit("http://localhost:3000/");

    //should enter numbers then backspace then enter decimal then click divide then enter numbers then backspace then enter decimal then click enter then clear
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-backspace"]').click();
    cy.get('[data-cy="bttn-decimal"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-divide"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-backspace"]').click();
    cy.get('[data-cy="bttn-decimal"]').click();
    cy.get('[data-cy="bttn-5"]').click();
    cy.get('[data-cy="bttn-enter"]').click();
    cy.get('[data-cy="display"]').should("contain.text", "1.0");
    cy.get('[data-cy="bttn-clear"]').click();
    cy.get('[data-cy="display"]').should("not.contain.text");
  });
});
