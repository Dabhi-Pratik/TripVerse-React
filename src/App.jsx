import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./router/MainLayout";
import Loading from "./components/ui/Loading";
import Error from "./components/ui/Error";

const Home = lazy(() => import("./components/pages/Home"));
const Trips = lazy(() => import("./components/pages/Trips"));
const TripDetail = lazy(() => import("./components/pages/TripDetail"));
const Auth = lazy(() => import("./components/forms/Auth"));
const BookingForm = lazy(() => import("./components/forms/BookingForm"));
const MyBookings = lazy(() => import("./components/pages/MyBookings"));

const App = () => {
  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      errorElement: <Error />,
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
        {
          path: "*",
          element: <Error />,
        },
      ],
    },
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
