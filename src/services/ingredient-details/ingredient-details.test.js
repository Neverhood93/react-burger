import {
  ingredientDetailsSlice,
  initialState,
  openIngredientModal,
  closeIngredientModal,
} from "./reducer";

describe("ingredientDetailsSlice redux store and actions", () => {
  const mockIngredient = {
    _id: "1",
    name: "Test Ingredient",
    type: "main",
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 40,
    price: 50,
    image: "test_image.jpg",
    image_mobile: "test_image_mobile.jpg",
    image_large: "test_image_large.jpg",
    __v: 0,
  };

  it("should return the initial state", () => {
    expect(
      ingredientDetailsSlice.reducer(undefined, { type: undefined }),
    ).toEqual(initialState);
  });

  it("should handle openIngredientModal", () => {
    const action = openIngredientModal(mockIngredient);
    const state = ingredientDetailsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      selectedIngredient: mockIngredient,
    });
  });

  it("should handle closeIngredientModal", () => {
    const action = closeIngredientModal();
    const stateWithIngredient = {
      ...initialState,
      selectedIngredient: mockIngredient,
    };
    const state = ingredientDetailsSlice.reducer(stateWithIngredient, action);
    expect(state).toEqual(initialState);
  });
});
