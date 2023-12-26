import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import Dining from "../pages/Dining/Dining";
import { AnimatePresence } from "framer-motion";
import OrderMainPage from "../pages/Order/OrderMainPage";
import Privateroutes from "./Privateroutes";
import Login from "../pages/Auth/Login";
import AdminMainPage from "../pages/Admin Panel/AdminMainPage";
import UsersTable from "../pages/Admin Panel/Main/Users/UsersTable";
import ReportMain from "../pages/Admin Panel/Main/Reports/ReportMain";
import Categories from "../pages/Order/Componants/Categories/Categories";
import Products from "../pages/Order/Componants/Product/Products";
import Floors from "../pages/Admin Panel/Main/Floors/Floors";
import KitchenOrderShow from "../pages/Kitchen/KitchenOrderShow";
import PasswordReset from "../pages/Auth/PasswordReset";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/password/reset/:uid/:token",
    element: <PasswordReset />,
  },
  {
    element: <Privateroutes />,
    children: [
      {
        path: "/",
        element: (
          <AnimatePresence>
            <MainPage />
          </AnimatePresence>
        ),
      },
      {
        path: "/dining",
        element: (
          <AnimatePresence>
            <Dining />
          </AnimatePresence>
        ),
      },
      {
        path: "/kitchen",
        element: <KitchenOrderShow/>
      },
      {
        path: "/dining/order/:table",
        element: (
          <AnimatePresence>
            <OrderMainPage />
          </AnimatePresence>
        ),
        children: [
          { path: "", element: <Categories /> },
          { path: "products/:id", element: <Products/> },
        ],
      },

      {
        path: "/admin",
        element: <AdminMainPage />,
        children: [
          { path: "", element: <UsersTable /> },
          { path: "reports", element: <ReportMain /> },
          { path: "floors", element: <Floors /> },
        ],
      },
    ],
  },
]);

export default router;
