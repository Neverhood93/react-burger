import {
  profileOrdersSlice,
  initialState,
  wsProfileOrdersConnecting,
  wsProfileOrdersOpen,
  wsProfileOrdersClose,
  wsProfileOrdersError,
  wsProfileOrdersMessage,
} from "./reducer";
import { WebsocketStatus } from "../../types/types";

describe("profileOrdersSlice redux store and actions", () => {
  const mockOrder = {
    _id: "1",
    number: 1,
    name: "Test Order",
    ingredients: [1, 2, 3],
    status: "done",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  };

  const mockOrderResponse = {
    success: true,
    orders: [mockOrder],
    total: 100,
    totalToday: 10,
  };

  it("should return the initial state", () => {
    expect(profileOrdersSlice.reducer(undefined, { type: undefined })).toEqual(
      initialState,
    );
  });

  it("should handle wsProfileOrdersConnecting", () => {
    const action = wsProfileOrdersConnecting();
    const state = profileOrdersSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      status: WebsocketStatus.CONNECTING,
    });
  });

  it("should handle wsProfileOrdersOpen", () => {
    const action = wsProfileOrdersOpen();
    const state = profileOrdersSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
      connectionError: null,
    });
  });

  it("should handle wsProfileOrdersClose", () => {
    const action = wsProfileOrdersClose();
    const state = profileOrdersSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    });
  });

  it("should handle wsProfileOrdersError", () => {
    const action = wsProfileOrdersError("Test Error");
    const state = profileOrdersSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      connectionError: "Test Error",
    });
  });

  it("should handle wsProfileOrdersMessage", () => {
    const action = wsProfileOrdersMessage(mockOrderResponse);
    const state = profileOrdersSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      success: true,
      orders: mockOrderResponse.orders,
      total: mockOrderResponse.total,
      totalToday: mockOrderResponse.totalToday,
    });
  });
});
