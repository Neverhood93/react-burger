import { selectors } from "../support/selectors";

describe("constructor tests", function () {
  beforeEach(function () {
    cy.intercept("GET", "ingredients", { fixture: "ingredients" });
    cy.visit("/");
  });

  it("should open modal with ingredient detail and close with close button", () => {
    cy.get(selectors.bun).click({ force: true });
    cy.get(selectors.modalBox).should("exist");

    cy.get(selectors.ingredientName).should(
      "have.text",
      "Краторная булка N-200i",
    );
    cy.get(selectors.ingredientCalories).should("have.text", "420");
    cy.get(selectors.ingredientProteins).should("have.text", "80");
    cy.get(selectors.ingredientFat).should("have.text", "24");
    cy.get(selectors.ingredientCarbohydrates).should("have.text", "53");

    cy.get(selectors.closeButton).click({ force: true });
    cy.get(selectors.modalBox).should("not.exist");
  });

  it("should open modal with ingredient detail and close with Esc button", () => {
    cy.get(selectors.bun).click({ force: true });
    cy.get(selectors.modalBox).should("exist");
    cy.get("body").type("{esc}");
    cy.get(selectors.modalBox).should("not.exist");
  });

  it("should open modal with ingredient detail and close with click on overlay", () => {
    cy.get(selectors.bun).click({ force: true });
    cy.get(selectors.modalBox).should("exist");
    cy.get(selectors.modalOverlay).click({ force: true });
    cy.get(selectors.modalBox).should("not.exist");
  });

  it("drag and drop ingredients", () => {
    cy.get(selectors.bun).as("bun");
    cy.get(selectors.ingredient1).as("ingredient_1");
    cy.get(selectors.ingredient2).as("ingredient_2");
    cy.get(selectors.constructor).as("constructor");

    cy.get("@bun").trigger("dragstart", { force: true });
    cy.get("@constructor").trigger("drop", { force: true });

    cy.get("@ingredient_1").trigger("dragstart", { force: true });
    cy.get("@constructor").trigger("drop", { force: true });

    cy.get("@ingredient_2").trigger("dragstart", { force: true });
    cy.get("@constructor").trigger("drop", { force: true });
  });
});
