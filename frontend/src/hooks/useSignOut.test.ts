import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import signOutUseCase from "@/useCase/signOutUseCase";
import useSignOut from "./useSignOut";

vi.mock("@/useCase/signOutUseCase", () => ({
  default: vi.fn(),
}))

const mockSignOut = vi.mocked(signOutUseCase);

describe("useSignOut", () => {
  it("サインアウトの成功", async () => {
    const { result } = renderHook(() => useSignOut());

    await act(() => {
      result.current.signOut();
    })

    expect(mockSignOut).toHaveBeenCalledWith();
    expect(mockSignOut).toBeCalledTimes(1);
  })

  it("サインアウトの失敗", async () => {
    const error = new Error("Failed to sign out");
    mockSignOut.mockRejectedValue(error);

    const { result } = renderHook(() => useSignOut());

    await act(async () => {
      await result.current.signOut();
    })

    expect(mockSignOut).toHaveBeenCalledWith();
  })
})