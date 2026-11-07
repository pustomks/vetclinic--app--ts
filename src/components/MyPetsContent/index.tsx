import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { App, Button, Flex, Input, Modal, Typography } from "antd";
import { addPet, fetchPets, updatePet } from "../../store/slices/petsSlice";
import type { CreatePet, Pet } from "../../types";
import PetForm from "../../components/PetForm";
import PetList from "../../components/PetList";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

export default function MyPetsContent() {
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [searchPets, setSearchPets] = useState("");
  const { message } = App.useApp();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.pets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { Title } = Typography;
  const { items } = useAppSelector((state) => state.pets);

  useEffect(() => {
    dispatch(fetchPets())
      .unwrap()
      .catch((error: string) => {
        message.error(error);
      });
  }, []);

  const showModal = () => {
    setEditingPet(null);
    setIsModalOpen(true);
  };

  const handleEdit = (pet: Pet) => {
    setEditingPet(pet);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingPet(null);
  };

  const onSubmit = (data: CreatePet) => {
    if (editingPet) {
      const updatePetData: Pet = { ...editingPet, ...data };
      dispatch(updatePet(updatePetData))
        .unwrap()
        .then(() => {
          message.success("Pet successfully updated!");
          setIsModalOpen(false);
          setEditingPet(null);
        })
        .catch((error: string) => {
          message.error(error);
        });
    } else {
      dispatch(addPet(data))
        .unwrap()
        .then(() => {
          message.success("Pet successfully added!");
          setIsModalOpen(false);
        })
        .catch((error: string) => {
          message.error(error);
        });
    }
  };

  const filteredItems = items.filter((pet) =>
    pet.name.toLocaleLowerCase().includes(searchPets.toLocaleLowerCase()),
  );

  return (
    <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
      <Flex
        justify="space-between"
        align="center"
        style={{ marginBottom: "24px" }}
      >
        <Title level={2} style={{ margin: 0 }}>
          Мои питомцы
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={showModal}
        >
          Добавить питомца
        </Button>
      </Flex>

      <div style={{ marginBottom: 24, maxWidth: 400 }}>
        <Input
          placeholder="Search by name..."
          allowClear
          value={searchPets}
          onChange={(e) => setSearchPets(e.target.value)}
          size="large"
          prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
        />
      </div>

      <PetList handleEdit={handleEdit} filteredItems={filteredItems} />

      <Modal
        title={editingPet ? "Редактировать питомца" : "Добавить нового питомца"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        destroyOnHidden
      >
        <PetForm
          onSubmit={onSubmit}
          loading={loading}
          initialData={editingPet}
        />
      </Modal>
    </div>
  );
}
