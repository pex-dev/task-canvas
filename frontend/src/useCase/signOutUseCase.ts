import { signOut as driverSignOut } from "@/driver";

const signOut = async (): Promise<void> => {
  try {
    await driverSignOut();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to sign out');
  }
}

export default signOut;