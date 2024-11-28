import { act, renderHook } from '@testing-library/react';

import { signUp as signUpUseCase } from '@/useCase/signUpUseCase';

import useSignUp from './useSignUp';

vi.mock('@/useCase/signUpUseCase', () => ({
  signUp: vi.fn(),
}));

const mockSignUp = vi.mocked(signUpUseCase);

describe('useSignUp', () => {
  it('新しいユーザーを登録する', async () => {
    const { result } = renderHook(() => useSignUp());

    act(async () => {
      result.current.signUp({ email: 'test@example.com', password: 'test' });
    });

    expect(mockSignUp).toHaveBeenCalledWith({ email: 'test@example.com', password: 'test' });
    expect(mockSignUp).toBeCalledTimes(1);
  });
});
