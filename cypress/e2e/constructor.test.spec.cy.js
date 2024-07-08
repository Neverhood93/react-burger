describe("сonstructor tests", function () {
  beforeEach(function () {
    cy.intercept("GET", "ingredients", { fixture: "ingredients" });

    cy.visit("http://localhost:3000");
  });

  it("should open modal with ingredient detail and close with close button", () => {
    cy.get('[data-test-id="643d69a5c3f7b9001cfa093c"]').click({ force: true });
    cy.get('[data-test-id="modal_box"]').should("exist");

    cy.get('[data-test-id="ingredient_name"]').should(
      "have.text",
      "Краторная булка N-200i",
    );
    cy.get('[data-test-id="ingredient_calories"]').should("have.text", "420");
    cy.get('[data-test-id="ingredient_proteins"]').should("have.text", "80");
    cy.get('[data-test-id="ingredient_fat"]').should("have.text", "24");
    cy.get('[data-test-id="ingredient_carbohydrates"]').should(
      "have.text",
      "53",
    );

    cy.get('[data-test-id="close_button"]').click({ force: true });
    cy.get('[data-test-id="modal_box"]').should("not.exist");
  });

  it("should open modal with ingredient detail and close with Esc button", () => {
    cy.get('[data-test-id="643d69a5c3f7b9001cfa093c"]').click({ force: true });
    cy.get('[data-test-id="modal_box"]').should("exist");
    cy.get("body").type("{esc}");
    cy.get('[data-test-id="modal_box"]').should("not.exist");
  });

  it("should open modal with ingredient detail and close with click on overlay", () => {
    cy.get('[data-test-id="643d69a5c3f7b9001cfa093c"]').click({ force: true });
    cy.get('[data-test-id="modal_box"]').should("exist");
    cy.get('[data-test-id="modal_overlay"]').click({ force: true });
    cy.get('[data-test-id="modal_box"]').should("not.exist");
  });
});
