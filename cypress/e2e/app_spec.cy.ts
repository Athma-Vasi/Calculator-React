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
