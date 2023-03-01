import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CreateProvider } from "../context/ContextApi";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CreateProvider>
      <Component {...pageProps} />
    </CreateProvider>
  );
}

export default MyApp;
