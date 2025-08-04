import { LoginScreen } from "@/modules/auth/screens/LoginScreen";
import AuthLoginProvider from "@/modules/auth/providers/AuthLoginProvider";

export default function LoginPage() {
  return (
    <AuthLoginProvider>
      <LoginScreen />
    </AuthLoginProvider>
  );
}
