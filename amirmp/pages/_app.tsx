import "../styles/globals.css";
import { CreateProvider } from "../context/context";
import type { AppProps } from "next/app";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CreateProvider>
      <Component {...pageProps} />
    </CreateProvider>
  );
}

export default MyApp;
