import signOutUseCase from "@/useCase/signOutUseCase"

type UseSignOutResult = {
  signOut: () => Promise<void>;
}

const useSignOut = (): UseSignOutResult => {
  const signOut = async (): Promise<void> => {
    try {
      await signOutUseCase();
    } catch (error) {
      console.error(error);
    }
  }

  return { signOut };
}

export default useSignOut;