import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import LoadingOverlayProvider from "./context/LoadingOverlay.tsx";
import { AuthProvider } from "./context/Auth.tsx";
import { CartProvider } from "./context/Cart.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WishlistProvider } from "./context/Wishlist.tsx";
import { CheckoutProvider } from "./context/CheckoutContext.tsx";
import { AddressProvider } from "./context/Addresses.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LoadingOverlayProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <CheckoutProvider>
                <AddressProvider>
                  <App />
                </AddressProvider>
              </CheckoutProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </LoadingOverlayProvider>
    </QueryClientProvider>
  </StrictMode>,
);
