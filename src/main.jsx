import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "./app/store";
import IntrnetConnectionProvider from "./providerWrap/IntrnetConnectionProvider.jsx";
// import { PersistGate } from 'redux-persist/integration/react'

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:false
    }
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <IntrnetConnectionProvider>
        <BrowserRouter>
          <ChakraProvider theme={theme}>
            {/* <PersistGate loading={null} persistor={persistor}> */}
            <App />
            {/* </PersistGate> */}
          </ChakraProvider>
        </BrowserRouter>
      </IntrnetConnectionProvider>
    </Provider>
  </QueryClientProvider>
);
