import React, { useState } from "react";
import type { PasswordFormData } from "../../types";
import { App, Button, Input } from "antd";
import api from "../../api/axios";
import styles from "./EditUserPassword.module.css";

export default function EditUserPassword() {
  const [formData, setFormData] = useState<PasswordFormData>({
    currentPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const { message } = App.useApp();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put<void>("/api/users/me/password", formData);
      message.success("Password changed successfully!");
      setFormData({ currentPassword: "", newPassword: "" });
    } catch (error: any) {
      console.error(error);
      message.error(
        error.response?.data?.message || "Failed to change password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.editContainer}>
      <h2>Изменить пароль</h2>
      <form className={styles.editUserPassword} onSubmit={handleSubmit}>
        <Input.Password
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleInputChange}
          placeholder="Current password"
          disabled={loading}
          required
        />
        <Input.Password
          name="newPassword"
          value={formData.newPassword}
          onChange={handleInputChange}
          placeholder="New password"
          disabled={loading}
          required
        />
        <Button loading={loading} type="primary" htmlType="submit" block>
          Save
        </Button>
      </form>
    </div>
  );
}
