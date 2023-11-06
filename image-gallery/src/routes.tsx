import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Layout, RootErrorBoundary } from "./components/layouts";
import { Home } from "./pages/Home";
import { Gallery } from "./pages/Gallery";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <RootErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ":id",
        element: <Gallery />,
      },
    ],
  },
];
const router = createBrowserRouter(routes);
export default router;
