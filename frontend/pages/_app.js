import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";

import { QueryClient, QueryClientProvider } from "react-query";

// Create a client
export const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="border-b py-7 text-center flex items-center justify-center">
        <img className="w-16" src="/logo.png" />
        <h1 className="text-5xl m-0 ml-5">React Query Demo</h1>
      </div>
      <div className="p-28">
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;
