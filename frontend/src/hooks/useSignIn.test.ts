import { act, renderHook } from '@testing-library/react';

import { signIn as signInUseCase } from '@/useCase/signInUseCase';

import useSignIn from './useSignIn';

vi.mock('@/useCase/signInUseCase', () => ({
  signIn: vi.fn(),
}));

const mockSignIn = vi.mocked(signInUseCase);

describe('useSignIn', () => {
  it('サインインの成功', async () => {
    const { result } = renderHook(() => useSignIn());

    await act(async () => {
      await result.current.signIn({ email: 'test@example.com', password: 'test' });
    });

    expect(mockSignIn).toHaveBeenCalledWith({ email: 'test@example.com', password: 'test' });
    expect(mockSignIn).toBeCalledTimes(1);
  });
});
