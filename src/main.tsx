import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DappProviders } from "./components/providers/DappProvider.tsx";
import { KuboProvider } from "./components/providers/KuboProvider.tsx";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import ErrorPage from "./components/pages/ErrorPage.tsx";
import theme from "./theme.ts";
import ConnectPage from "./components/pages/ConnectPage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/pages/_Layout.tsx";
import { AlertProvider } from "./components/providers/AlertProvider.tsx";
import HomePage from "./components/pages/HomePage.tsx";
import { OpmlProvider } from "./components/providers/OpmlProvider.tsx";
import ConnectWalletPage from "./components/pages/ConnectWalletPage.tsx";
import ConnectIPFSPage from "./components/pages/ConnectIPFSPage.tsx";
import ConnectOpmlPage from "./components/pages/ConnectOpmlPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: (
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Layout />
      </ChakraProvider>
    ),
    children: [
      {
        path: "/connect",
        element: <ConnectPage />,
        children: [
          {
            path: "wallet",
            element: <ConnectWalletPage />,
          },
          {
            path: "ipfs",
            element: <ConnectIPFSPage />,
          },
          {
            path: "opml",
            element: <ConnectOpmlPage />,
          },
        ],
      },
      {
        path: "/home",
        element: <HomePage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AlertProvider>
      <DappProviders>
        <KuboProvider>
          <OpmlProvider>
            <RouterProvider router={router} />
          </OpmlProvider>
        </KuboProvider>
      </DappProviders>
    </AlertProvider>
  </StrictMode>
);
