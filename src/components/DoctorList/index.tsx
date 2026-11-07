import React from "react";
import { useAppDispatch } from "../../hooks/redux";
import { App, Card, Col, Row, Space, Tooltip, Badge } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteDoctor } from "../../store/slices/doctorsSlice";
import type { Doctor } from "../../types";
import "./DoctorList.css";

interface DoctorListProps {
  handleEdit: (doctor: Doctor) => void;
  filteredItems: Doctor[];
}

const DoctorList: React.FC<DoctorListProps> = ({
  handleEdit,
  filteredItems,
}) => {
  const dispatch = useAppDispatch();
  const { message, modal } = App.useApp();

  const handleDelete = (id: number, firstName: string, lastName: string) => {
    modal.confirm({
      title: "Delete doctor",
      content: `Are you sure you want to delete Dr. ${firstName} ${lastName}?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        return dispatch(deleteDoctor(id))
          .unwrap()
          .then(() => {
            message.success("Doctor successfully deleted!");
          })
          .catch((error: string) => {
            message.error(error);
          });
      },
    });
  };

  return (
    <div className="doctors-scroll-container">
      <Row gutter={[24, 24]} style={{ alignItems: "stretch" }}>
        {filteredItems.map((doctor) => {
          const fullName = `${doctor.firstName} ${doctor.lastName}`;

          return (
            <Col
              style={{ display: "flex" }}
              key={doctor.id}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              xl={6}
            >
              <Card
                title={fullName}
                hoverable
                extra={
                  <Space size="middle">
                    <Tooltip title="Edit">
                      <EditOutlined
                        onClick={() => handleEdit(doctor)}
                        style={{
                          color: "#1890ff",
                          cursor: "pointer",
                          fontSize: "16px",
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Delete">
                      <DeleteOutlined
                        onClick={() =>
                          handleDelete(
                            doctor.id,
                            doctor.firstName,
                            doctor.lastName,
                          )
                        }
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
                <div style={{ marginBottom: "8px", width: "100%" }}>
                  <Badge
                    status={doctor.active ? "success" : "error"}
                    text={doctor.active ? "Active" : "Inactive"}
                  />
                </div>
                <div
                  className="doctor-info-row"
                  style={{ marginBottom: "4px" }}
                >
                  <strong>Specialization:</strong> {doctor.specialization}
                </div>
                <div
                  className="doctor-info-row"
                  style={{ marginBottom: "4px" }}
                >
                  <strong>Phone:</strong> {doctor.phone}
                </div>
                <div
                  className="doctor-info-row"
                  style={{ marginBottom: "4px" }}
                >
                  <strong>Email:</strong> {doctor.email}
                </div>
                <div
                  className="doctor-info-row"
                  style={{ marginBottom: "4px" }}
                >
                  <strong>License:</strong> {doctor.veterinaryLicense}
                </div>
                <div
                  className="doctor-info-row"
                  style={{ marginBottom: "4px" }}
                >
                  <strong>Experience:</strong> {doctor.yearsOfExperience} years
                </div>
                {doctor.bio && (
                  <div className="doctor-info-row">
                    <strong>Bio:</strong> {doctor.bio}
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

export default DoctorList;
