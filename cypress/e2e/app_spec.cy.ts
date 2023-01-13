import { mount } from "cypress/react18";

describe("Theme Switching", () => {
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
