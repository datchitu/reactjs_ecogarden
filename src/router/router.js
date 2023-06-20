import CategoryPage from "../pages/category"
import NotFound from "../pages/errors/404"
import HomePage from "../pages/home"
import ProductPage from "../pages/product"
import AdminCategoryPage from "../pages/admin/category/AdminCategoryPage";
import AdminProductPage from "../pages/admin/product/AdminProductPage";
import AdminUserPage from "../pages/admin/user/AdminUserPage";
import AdminTransactionPage from "../pages/admin/transaction/AdminTransactionPage";
import AccountPage from "../pages/account/AccountPage";
import OrderPage from "../pages/account/OrderPage";
import ProfilePage from "../pages/account/ProfilePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import SearchPage from "../pages/search";
import CartPage from "../pages/cart/CartPage";
import UpdateProductPage from "../pages/admin/product/UpdateProductPage";
import UpdateCategoryPage from "../pages/admin/category/UpdateCategoryPage";
import CreateCategoryPage from "../pages/admin/category/CreateCategoryPage";
import SuccessPay from "../pages/cart/SuccessPay";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import ChangePasswordPage from "../pages/account/ChangePasswordPage";
import PageArticle from "../pages/test/PageArticle";
import ProductAllPage from "../pages/product-all";

export const routes = () => {
    return [
        {
            path: "/",
            element: <HomePage />,
            index: true,
            exact: true
        },
        {
            path: "/san-pham",
            element: <CategoryPage />,
        },
        {
            path: "/tat-ca-san-pham",
            element: <ProductAllPage />,
        },
        {
            path: "/search",
            element: <SearchPage />,
        },
        {
            path: "/test/article",
            element: <PageArticle />,
        },
        {
            path: "/cart",
            element: <CartPage />,
        },
        {
            path: "/order/success",
            element: <SuccessPay />,
        },
        {
            path: "/danh-muc",
            children: [
                {
                    path: ":slug",
                    // path: ":slug-:id",
                    element: <CategoryPage />,
                },
                {
                    path: "*",
                    element: <CategoryPage />,
                }
            ]
        },
        {
            path: '/san-pham/:slug',
            element: <ProductPage />
        },
        // Route admin
        {
            path: "/admin",
            children: [
                {
                    path: "category",
                    children: [
                        {
                            path: "",
                            element: <AdminCategoryPage />,
                        },
                        {
                            path: "create",
                            element: <CreateCategoryPage />,
                        },
                        {
                            path: "edit/:id",
                            element: <UpdateCategoryPage />,
                        },
                        {
                            path: "*",
                            element: <AdminCategoryPage />,
                        }
                    ]
                },
                {
                    path: "product",
                    children: [
                        {
                            path: "",
                            element: <AdminProductPage />,
                        },
                        {
                            path: "edit/:id",
                            element: <UpdateProductPage />,
                        },
                        {
                            path: "*",
                            element: <AdminProductPage />,
                        }
                    ]
                },
                {
                    path: "user",
                    element: <AdminUserPage />,
                },
                {
                    path: "transaction",
                    element: <AdminTransactionPage />,
                },
            ]
        },
        {
            path: "/account",
            children: [
                {
                    path: "",
                    element: <AccountPage />,
                },
                {
                    path: "order",
                    element: <OrderPage />,
                },
                {
                    path: "profile",
                    element: <ProfilePage />,
                },{
                    path: "change-password",
                    element: <ChangePasswordPage />,
                },
            ]
        },
        {
            path: "/auth",
            children: [
                {
                    path: "login",
                    element: <LoginPage />,
                },
                {
                    path: "register",
                    element: <RegisterPage />,
                },
                {
                    path: "forgot-password",
                    element: <ForgotPassword />,
                },
                {
                    path: "reset-password",
                    element: <ResetPassword />,
                }
            ]
        },
        {
            path: '*',
            element: <NotFound />
        },
    ]
}
