import { SessionProvider } from "next-auth/react";
import "../styles/tailwind.css";
import "../styles/slick.css";
import "../styles/fonts.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={true}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
