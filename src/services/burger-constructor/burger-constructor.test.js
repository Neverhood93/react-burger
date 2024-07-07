import {
  selectedIngredientsSlice,
  initialState,
  addIngredient,
  removeIngredient,
  clearIngredients,
  moveIngredient,
} from "./reducer";
import { v4 as uuidv4 } from "uuid";

jest.mock("uuid");

describe("selectedIngredientsSlice redux store and actions", () => {
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

  const mockBun = {
    ...mockIngredient,
    type: "bun",
  };

  beforeEach(() => {
    uuidv4.mockReturnValue("unique-id");
  });

  it("should return the initial state", () => {
    expect(
      selectedIngredientsSlice.reducer(undefined, { type: undefined }),
    ).toEqual(initialState);
  });

  it("should handle addIngredient for bun", () => {
    const action = addIngredient(mockBun);
    const state = selectedIngredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      bun: { ...mockBun, uniqueId: "unique-id" },
      ingredients: [],
    });
  });

  it("should handle addIngredient for non-bun ingredient", () => {
    const actionBun = addIngredient(mockBun);
    let state = selectedIngredientsSlice.reducer(initialState, actionBun);
    const action = addIngredient(mockIngredient);
    state = selectedIngredientsSlice.reducer(state, action);
    expect(state).toEqual({
      bun: { ...mockBun, uniqueId: "unique-id" },
      ingredients: [{ ...mockIngredient, uniqueId: "unique-id" }],
    });
  });

  it("should handle removeIngredient for bun", () => {
    const initialStateWithBun = {
      bun: { ...mockBun, uniqueId: "unique-id" },
      ingredients: [],
    };
    const action = removeIngredient("unique-id");
    const state = selectedIngredientsSlice.reducer(initialStateWithBun, action);
    expect(state).toEqual(initialState);
  });

  it("should handle removeIngredient for non-bun ingredient", () => {
    const initialStateWithIngredients = {
      bun: { ...mockBun, uniqueId: "unique-id" },
      ingredients: [{ ...mockIngredient, uniqueId: "unique-id-2" }],
    };
    const action = removeIngredient("unique-id-2");
    const state = selectedIngredientsSlice.reducer(
      initialStateWithIngredients,
      action,
    );
    expect(state).toEqual({
      bun: { ...mockBun, uniqueId: "unique-id" },
      ingredients: [],
    });
  });

  it("should handle clearIngredients", () => {
    const initialStateWithIngredients = {
      bun: { ...mockBun, uniqueId: "unique-id" },
      ingredients: [{ ...mockIngredient, uniqueId: "unique-id-2" }],
    };
    const action = clearIngredients();
    const state = selectedIngredientsSlice.reducer(
      initialStateWithIngredients,
      action,
    );
    expect(state).toEqual(initialState);
  });

  it("should handle moveIngredient", () => {
    const initialStateWithIngredients = {
      bun: { ...mockBun, uniqueId: "unique-id" },
      ingredients: [
        { ...mockIngredient, uniqueId: "unique-id-1" },
        { ...mockIngredient, uniqueId: "unique-id-2" },
      ],
    };
    const action = moveIngredient({ fromIndex: 0, toIndex: 1 });
    const state = selectedIngredientsSlice.reducer(
      initialStateWithIngredients,
      action,
    );
    expect(state.ingredients).toEqual([
      { ...mockIngredient, uniqueId: "unique-id-2" },
      { ...mockIngredient, uniqueId: "unique-id-1" },
    ]);
  });
});
