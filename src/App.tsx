import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HeaderApp from "./components/HeaderApp";
import MainPage from "./pages/MainPage";
import { ConfigProvider, theme, App as AntdApp } from "antd";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { checkRole } from "./store/slices/roleSlice";
import { useEffect } from "react";
import FavoritePage from "./pages/FavoritePage";
import DoctorsPage from "./pages/DoctorsPage";
import ContacsPage from "./pages/ContacsPage";
import AboutPage from "./pages/AboutPage";
import MyProfilePage from "./pages/MyProfilePage";
import MyPetsPage from "./pages/MyPetsPage";
import MyPetPage from "./pages/MyPetPage";
import DoctorsOfficePage from "./pages/DoctorsOfficePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  const { token } = useAppSelector((state) => state.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) {
      return;
    }
    dispatch(checkRole());
  }, [token]);

  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <AntdApp>
        <HeaderApp />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/favorite" element={<FavoritePage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/contacs" element={<ContacsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<MyProfilePage />} />
            <Route path="/mypets" element={<MyPetsPage />} />
            <Route path="/mypets/:id" element={<MyPetPage />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/doctors-office" element={<DoctorsOfficePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
