import { Link } from "react-router-dom";
import { logout } from "../../store/slices/tokenSlice";
import { App, Button } from "antd";
import "./HeaderApp.css";
import { deleteUserRole } from "../../store/slices/roleSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { USER_ROLES } from "../../const";

export default function HeaderApp() {
  const { token } = useAppSelector((state) => state.token);
  const { role } = useAppSelector((state) => state.role);
  const dispatch = useAppDispatch();
  const favoriteItems = useAppSelector((state) => state.favorites.items);

  const { modal } = App.useApp();

  const handleLogout = () => {
    modal.confirm({
      title: "Confirm Logout",
      content: "Are you sure you want to log out of your account?",
      okText: "Logout",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        dispatch(logout());
        dispatch(deleteUserRole());
      },
    });
  };

  return (
    <nav className="header-nav">
      <div className="header-links">
        <Link to="/">Главная</Link>
        <Link to="/doctors">Врачи</Link>
        {token && role === USER_ROLES.ADMIN && (
          <Link to="/doctors-office">Кабинет врачей</Link>
        )}
        <Link to="/contacs">Контакты</Link>
        <Link to="/about">О нас</Link>
        {token && <Link to="/mypets">Мои питомцы</Link>}
        {token && <Link to="/favorite">Избранное({favoriteItems.length})</Link>}
      </div>

      <div className="header-auth">
        {token && <Link to="/profile">Мой профиль</Link>}

        {token ? (
          <Button type="primary" danger onClick={handleLogout}>
            logout
          </Button>
        ) : (
          <Link to="/auth">Авторизоваться</Link>
        )}
      </div>
    </nav>
  );
}
