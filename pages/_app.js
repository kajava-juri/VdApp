import { SWRConfig } from "swr";
import fetchJson from "../lib/fetchJson";
import "../css/index.css";
function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;