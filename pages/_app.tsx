import "../styles/tailwind.css";
import "../styles/slick.css";
import "../styles/fonts.css";

function MyApp({ Component, pageProps }) {
  return (
    // frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}
    // navigate={(to) => router.push(to)}
    <Component {...pageProps} />
  );
}
export default MyApp;
/* import "../styles/tailwind.css";
 * import "../styles/slick.css";
 * import '../styles/fonts.css'
 *
 * function MyApp({ Component, pageProps }) {
 *   return <Component {...pageProps} />;
 * }
 *
 * export default MyApp; */
