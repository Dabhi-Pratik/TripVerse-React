import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./router/MainLayout";
import Loading from "./components/ui/Loading";
import { Suspense } from "react";
import MyBookings from "./components/pages/MyBookings";

const Home = lazy(() => import("./components/pages/Home"));
const Trips = lazy(() => import("./components/pages/Trips"));
const TripDetail = lazy(() => import("./components/pages/TripDetail"));
const Auth = lazy(() => import("./components/forms/Auth"));
const BookingForm = lazy(() => import("./components/forms/BookingForm"));

const App = () => {
  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "trips",
          element: <Trips />,
        },
        {
          path: "trips/:id",
          element: <TripDetail />,
        },
        {
          path: "booking/:id",
          element: <BookingForm />,
        },
        {
          path: "auth",
          element: <Auth />,
        },
        {
          path: "myBookings",
          element: <MyBookings />,
        },
      ],
    },
  ]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
};

export default App;
