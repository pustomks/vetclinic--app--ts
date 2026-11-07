import React from "react";
import FavoritePetsList from "../../components/FavoritePetsList";
import { App, Button, Flex, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteAllFavorites } from "../../store/slices/favoritePetSlice";

export default function FavoritePage() {
  const { Title } = Typography;
  const favoriteItems = useAppSelector((state) => state.favorites.items);
  const dispatch = useAppDispatch();
  const { message } = App.useApp();

  const handleClearAll = () => {
    dispatch(deleteAllFavorites());
    message.success("All pets removed from favorites!");
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
      <Flex
        justify="space-between"
        align="center"
        style={{ marginBottom: "24px" }}
      >
        <Title level={2} style={{ margin: 0 }}>
          Избранные питомцы
        </Title>

        {favoriteItems.length > 0 && (
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            size="large"
            onClick={handleClearAll}
          >
            Удалить всех
          </Button>
        )}
      </Flex>

      <FavoritePetsList />
    </div>
  );
}
