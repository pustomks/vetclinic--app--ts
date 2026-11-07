import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Card, Col, Empty, Row, Space, Tooltip } from "antd";
import "./FavoritePetsList.css";
import { toggleFavouritePet } from "../../store/slices/favoritePetSlice";
import { HeartFilled } from "@ant-design/icons";

export default function FavoritePetsList() {
  const dispatch = useAppDispatch();
  const favoriteItems = useAppSelector((state) => state.favorites.items);

  if (favoriteItems.length === 0) {
    return (
      <div style={{ padding: "40px 0", textAlign: "center" }}>
        <Empty description="No favorite pets added yet" />
      </div>
    );
  }

  return (
    <div className="pets-scroll-container">
      <Row gutter={[24, 24]} style={{ alignItems: "stretch" }}>
        {favoriteItems.map((pet) => {
          return (
            <Col
              style={{ display: "flex" }}
              key={pet.id}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              xl={6}
            >
              <Card
                title={pet.name}
                hoverable
                extra={
                  <Space size="middle">
                    <Tooltip title="Remove from favorites">
                      <HeartFilled
                        onClick={() => dispatch(toggleFavouritePet(pet))}
                        style={{
                          color: "#ff4d4f",
                          cursor: "pointer",
                          fontSize: "16px",
                        }}
                      />
                    </Tooltip>
                  </Space>
                }
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                  textAlign: "left",
                }}
                styles={{
                  body: {
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  },
                }}
              >
                <div className="pet-info-row">
                  <strong>Species:</strong> {pet.species}
                </div>
                <div className="pet-info-row">
                  <strong>Breed:</strong> {pet.breed}
                </div>
                <div className="pet-info-row">
                  <strong>Sex:</strong> {pet.sex}
                </div>
                <div className="pet-info-row">
                  <strong>Date of birth:</strong> {pet.dateOfBirth}
                </div>
                {pet.notes && (
                  <div className="pet-info-row">
                    <strong>Notes:</strong> {pet.notes}
                  </div>
                )}
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
