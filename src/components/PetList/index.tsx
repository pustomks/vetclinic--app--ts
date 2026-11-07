import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { App, Card, Col, Row, Space, Tooltip } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { deletePet } from "../../store/slices/petsSlice";
import "./PetList.css";
import type { Pet } from "../../types";
import { toggleFavouritePet } from "../../store/slices/favoritePetSlice";

interface PetListProps {
  handleEdit: (pet: Pet) => void;
  filteredItems: Pet[];
}

const PetList: React.FC<PetListProps> = ({ handleEdit, filteredItems }) => {
  const favoriteItems = useAppSelector((state) => state.favorites.items);
  const dispatch = useAppDispatch();
  const { message, modal } = App.useApp();

  const handleDelete = (id: number, name: string) => {
    modal.confirm({
      title: "Delete pet",
      content: `Are you sure you want to delete ${name}?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        return dispatch(deletePet(id))
          .unwrap()
          .then(() => {
            message.success("Pet successfully deleted!");
          })
          .catch((error: string) => {
            message.error(error);
          });
      },
    });
  };

  return (
    <div className="pets-scroll-container">
      <Row gutter={[24, 24]} style={{ alignItems: "stretch" }}>
        {filteredItems.map((pet) => {
          const isFavorite = favoriteItems.some((item) => item.id === pet.id);

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
                    <Tooltip
                      title={
                        isFavorite ? "Remove from favorites" : "Add to favorite"
                      }
                    >
                      {isFavorite ? (
                        <HeartFilled
                          onClick={() => dispatch(toggleFavouritePet(pet))}
                          style={{
                            color: "#ff4d4f",
                            cursor: "pointer",
                            fontSize: "16px",
                          }}
                        />
                      ) : (
                        <HeartOutlined
                          onClick={() => dispatch(toggleFavouritePet(pet))}
                          style={{
                            color: "#bfbfbf",
                            cursor: "pointer",
                            fontSize: "16px",
                          }}
                        />
                      )}
                    </Tooltip>
                    <Tooltip title="Edit">
                      <EditOutlined
                        onClick={() => handleEdit(pet)}
                        style={{
                          color: "#1890ff",
                          cursor: "pointer",
                          fontSize: "16px",
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Delete">
                      <DeleteOutlined
                        onClick={() => handleDelete(pet.id, pet.name)}
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
};

export default PetList;
