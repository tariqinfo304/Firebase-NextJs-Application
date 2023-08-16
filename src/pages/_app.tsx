import "../globals.css";
import type { AppProps } from "next/app";
import { UserAuthContextProvider } from "@/context/userAuthContext";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserAuthContextProvider>
      <Component {...pageProps} />
    </UserAuthContextProvider>
  );
}
