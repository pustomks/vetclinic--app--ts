import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { App, Button, Flex, Input, Modal, Typography } from "antd";
import {
  addDoctor,
  fetchDoctors,
  updateDoctor,
} from "../../store/slices/doctorsSlice";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import type { CreateDoctor, Doctor } from "../../types";
import DoctorForm from "../../components/DoctorForm";
import DoctorList from "../../components/DoctorList";

export default function DoctorsOfficePage() {
  const dispatch = useAppDispatch();
  const { message } = App.useApp();
  const { Title } = Typography;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const { items, loading } = useAppSelector((state) => state.doctors);
  const [searchDoctors, setSearchDoctors] = useState("");

  const showModal = () => {
    setEditingDoctor(null);
    setIsModalOpen(true);
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingDoctor(null);
  };

  useEffect(() => {
    dispatch(fetchDoctors())
      .unwrap()
      .catch((error: string) => {
        message.error(error);
      });
  }, []);

  const onSubmit = (data: CreateDoctor) => {
    if (editingDoctor) {
      const updatedDoctorData: Doctor = { ...editingDoctor, ...data };
      dispatch(updateDoctor(updatedDoctorData))
        .unwrap()
        .then(() => {
          message.success("Doctor successfully updated!");
          setIsModalOpen(false);
          setEditingDoctor(null);
        })
        .catch((error: string) => {
          message.error(error);
        });
    } else {
      dispatch(addDoctor(data))
        .unwrap()
        .then(() => {
          message.success("Doctor successfully added!");
          setIsModalOpen(false);
        })
        .catch((error: string) => {
          message.error(error);
        });
    }
  };

  const filteredItems = items.filter((doctor) => {
    const search = searchDoctors.toLowerCase();
    return (
      doctor.firstName.toLowerCase().includes(search) ||
      doctor.lastName.toLowerCase().includes(search)
    );
  });

  return (
    <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
      <Flex
        justify="space-between"
        align="center"
        style={{ marginBottom: "24px" }}
      >
        <Title level={2} style={{ margin: 0 }}>
          Кабинет врачей
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={showModal}
        >
          Добавить доктора
        </Button>
      </Flex>

      <div style={{ marginBottom: 24, maxWidth: 400 }}>
        <Input
          placeholder="Search by name..."
          allowClear
          value={searchDoctors}
          onChange={(e) => setSearchDoctors(e.target.value)}
          size="large"
          prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
        />
      </div>

      <DoctorList handleEdit={handleEdit} filteredItems={filteredItems} />

      <Modal
        title={
          editingDoctor ? "Редактировать доктора" : "Добавить нового доктора"
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        destroyOnHidden
      >
        <DoctorForm
          onSubmit={onSubmit}
          loading={loading}
          initialData={editingDoctor}
        />
      </Modal>
    </div>
  );
}
