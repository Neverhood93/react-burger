import {
  orderSlice,
  initialState,
  closeCreatedOrderDetailModal,
  closeOrderDetailModal,
} from "./reducer";
import { createOrder, fetchOrder } from "./actions";

describe("order redux store and actions", () => {
  test("should return the initial state", () => {
    expect(orderSlice.reducer(undefined, { type: undefined })).toEqual(
      initialState,
    );
  });

  test("should handle closeCreatedOrderDetailModal", () => {
    const previousState = {
      ...initialState,
      isCreatedOrderDetailModalOpen: true,
    };
    expect(
      orderSlice.reducer(previousState, closeCreatedOrderDetailModal()),
    ).toEqual({
      ...initialState,
      isCreatedOrderDetailModalOpen: false,
    });
  });

  test("should handle closeOrderDetailModal", () => {
    const previousState = { ...initialState, isOrderDetailModalOpen: true };
    expect(orderSlice.reducer(previousState, closeOrderDetailModal())).toEqual({
      ...initialState,
      isOrderDetailModalOpen: false,
    });
  });

  test("should handle createOrder.pending", () => {
    const action = { type: createOrder.pending.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      createdOrder: null,
      createOrderLoading: true,
      createOrderError: null,
      isCreatedOrderDetailModalOpen: true,
    });
  });

  test("should handle createOrder.fulfilled", () => {
    const orderResponse = {
      name: "Test Order",
      order: { number: 12345 },
      success: true,
    };
    const action = {
      type: createOrder.fulfilled.type,
      payload: orderResponse,
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      createdOrder: orderResponse,
      createOrderLoading: false,
      isCreatedOrderDetailModalOpen: true,
    });
  });

  test("should handle createOrder.rejected", () => {
    const errorMessage = "Create order failed";
    const action = {
      type: createOrder.rejected.type,
      error: { message: errorMessage },
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      createdOrder: null,
      createOrderLoading: false,
      createOrderError: errorMessage,
      isCreatedOrderDetailModalOpen: true,
    });
  });

  test("should handle fetchOrder.pending", () => {
    const action = { type: fetchOrder.pending.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      currentOrder: null,
      orderLoading: true,
      orderError: null,
      isOrderDetailModalOpen: true,
    });
  });

  test("should handle fetchOrder.fulfilled", () => {
    const order = {
      _id: "1",
      number: 12345,
      name: "Test Order",
      ingredients: [1, 2, 3],
      status: "done",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    };
    const orderResponse = {
      success: true,
      orders: [order],
    };
    const action = {
      type: fetchOrder.fulfilled.type,
      payload: orderResponse,
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      currentOrder: orderResponse,
      orderLoading: false,
      isOrderDetailModalOpen: true,
    });
  });

  test("should handle fetchOrder.rejected", () => {
    const errorMessage = "Fetch order failed";
    const action = {
      type: fetchOrder.rejected.type,
      error: { message: errorMessage },
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      currentOrder: null,
      orderLoading: false,
      orderError: errorMessage,
      isOrderDetailModalOpen: true,
    });
  });
});
