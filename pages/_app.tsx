import { SessionProvider } from "next-auth/react";
import "../styles/tailwind.css";
import "../styles/slick.css";
import "../styles/fonts.css";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
export default MyApp;
