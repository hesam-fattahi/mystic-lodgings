import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";

import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const App = () => {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="account" element={<Account />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingID" element={<Booking />} />
              <Route path="checkin/:bookingID" element={<Checkin />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="settings" element={<Settings />} />
              <Route path="users" element={<Users />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster
          position="top-right"
          gutter={8}
          toastOptions={{
            success: {
              duration: 2000,
            },
            error: {
              duration: 4000,
            },
            style: {
              fontSize: "1rem",
              padding: "1rem 1.5rem",
              backgroundColor: "var(--color-bg-secondary)",
              color: "var(--color-text-primary)",
              margin: "1rem 1.5rem",
              width: "fit-content",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
};

export default App;
