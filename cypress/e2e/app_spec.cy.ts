import { mount } from "cypress/react18";

describe("Theme Switching", () => {
  it("should display theme1 background colour on switch upon first visit", () => {
    cy.visit("http://localhost:3000/");

    cy.get("[data-cy='theme-switch']").should(
      "have.class",
      "bg-myRed1KeyToggleBg"
    );
  });
});
