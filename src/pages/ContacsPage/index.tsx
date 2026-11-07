import { App, Button, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";

export default function ContacsPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { message } = App.useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPhoneNumber("");
    setIsModalOpen(false);
    message.success("Number sent successfully!");
    console.log(phoneNumber);
  };

  return (
    <div>
      <Modal
        title="Оставьте номер и мы вам перезвоним"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          <Input
            type="tel"
            placeholder="+7 (999) 999-99-99"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <Button type="primary" htmlType="submit" block>
            Okey
          </Button>
        </form>
      </Modal>
    </div>
  );
}
