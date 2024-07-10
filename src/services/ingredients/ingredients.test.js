import { loadIngredients } from "./actions";
import { ingredientsSlice, initialState } from "./reducer";

describe("ingredients redux store and actions", () => {
  test("should return the initial state", () => {
    expect(ingredientsSlice.reducer(undefined, { type: undefined })).toEqual(
      initialState,
    );
  });

  test("should set ingredientsLoading to true when loading", () => {
    const action = { type: loadIngredients.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      ingredientsLoading: true,
      ingredientsError: null,
    });
  });

  test("should set ingredients and ingredientsLoading to false when fulfilled", () => {
    const action = {
      type: loadIngredients.fulfilled.type,
      payload: [{ id: 1, name: "Ingredient1" }],
    };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      ingredients: action.payload,
      ingredientsLoading: false,
    });
  });

  test("should set ingredientsLoading to false and set error message when rejected", () => {
    const errorMessage = "Fetch failed";
    const action = {
      type: loadIngredients.rejected.type,
      error: { message: errorMessage },
    };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      ingredientsLoading: false,
      ingredientsError: errorMessage,
    });
  });
});
