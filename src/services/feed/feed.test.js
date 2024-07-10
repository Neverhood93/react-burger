import {
  feedSlice,
  initialState,
  wsFeedConnecting,
  wsFeedOpen,
  wsFeedClose,
  wsFeedError,
  wsFeedMessage,
} from "./reducer";
import { WebsocketStatus } from "../../types/types";

describe("feedSlice redux store and actions", () => {
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
    expect(feedSlice.reducer(undefined, { type: undefined })).toEqual(
      initialState,
    );
  });

  it("should handle wsFeedConnecting", () => {
    const action = wsFeedConnecting();
    const state = feedSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      status: WebsocketStatus.CONNECTING,
    });
  });

  it("should handle wsFeedOpen", () => {
    const action = wsFeedOpen();
    const state = feedSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
      connectionError: null,
    });
  });

  it("should handle wsFeedClose", () => {
    const action = wsFeedClose();
    const state = feedSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    });
  });

  it("should handle wsFeedError", () => {
    const action = wsFeedError("Test Error");
    const state = feedSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      connectionError: "Test Error",
    });
  });

  it("should handle wsFeedMessage", () => {
    const action = wsFeedMessage(mockOrderResponse);
    const state = feedSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      success: true,
      orders: mockOrderResponse.orders,
      total: mockOrderResponse.total,
      totalToday: mockOrderResponse.totalToday,
    });
  });
});
