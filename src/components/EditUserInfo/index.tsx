import React, { useEffect, useState } from "react";
import type { UserDataResponse, UserFormData } from "../../types";
import { App, Button, Input } from "antd";
import { useAppDispatch } from "../../hooks/redux";
import api from "../../api/axios";
import styles from "./EditUserInfo.module.css";
import { logout } from "../../store/slices/tokenSlice";

export default function EditUserInfo() {
  const [formData, setFormData] = useState<UserFormData>({
    email: "",
    fullName: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const { message } = App.useApp();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await api.get<UserDataResponse>("/api/users/me");
        const { email, fullName } = response.data;
        setFormData({
          email,
          fullName,
        });
      } catch (error: any) {
        console.log(error);
        dispatch(logout());
        message.error(
          error.response?.data?.message || "Failed to load user profile",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.patch<UserDataResponse>(
        "/api/users/me",
        formData,
      );
      const data = response.data;
      setFormData({
        email: data.email,
        fullName: data.fullName,
      });
      console.log(data);
      message.success("Profile updated successfully!");
    } catch (error: any) {
      console.log(error);
      message.error(
        error.response?.data?.message || "Failed to update profile information",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.editContainer}>
      <h2>Редактировать профиль</h2>

      <form className={styles.formEditUserInfo} onSubmit={handleSubmit}>
        <Input
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="Full Name"
          disabled={loading}
        />
        <Input
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          disabled={loading}
        />
        <Button loading={loading} type="primary" htmlType="submit" block>
          Save
        </Button>
      </form>
    </div>
  );
}
