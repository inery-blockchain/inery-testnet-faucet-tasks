import "../styles/globals.css";
import { CreateProvider } from "../context/context";

function MyApp({ Component, pageProps }: any) {
  return (
    <CreateProvider>
      <Component {...pageProps} />
    </CreateProvider>
  );
}

export default MyApp;
