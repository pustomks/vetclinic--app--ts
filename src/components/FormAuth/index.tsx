import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import type { AuthData, AuthFormData } from "../../types";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { login } from "../../store/slices/tokenSlice";
import { App, Button, Input } from "antd";
import api from "../../api/axios";
import styles from "./FormAuth.module.css";

export default function FormAuth() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { message } = App.useApp();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<AuthFormData> = async (data) => {
    setLoading(true);
    try {
      const response = await api.post<AuthData>("/api/auth/login", data);
      const { accessToken } = response.data;
      dispatch(login(accessToken));
      console.log(accessToken);
      message.success("Successfully authorized!");
      navigate("/");
    } catch (error: any) {
      console.log(error);
      const errorMessage =
        error.response?.status === 401
          ? "Incorrect login or password"
          : error.response?.data?.message || "Server error";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.inputAuth} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formInput}>
        <Controller
          control={control}
          name="username"
          rules={{ required: "Please enter user name!" }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Enter user name"
              disabled={loading}
              status={errors.username ? "error" : ""}
            />
          )}
        />
        {errors.username?.message && (
          <div style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}>
            {errors.username.message}
          </div>
        )}
      </div>

      <div className={styles.formInput}>
        <Controller
          control={control}
          name="password"
          rules={{ required: "Please enter password!" }}
          render={({ field }) => (
            <Input.Password
              {...field}
              placeholder="Enter password"
              disabled={loading}
              status={errors.password ? "error" : ""}
            />
          )}
        />
        {errors.password?.message && (
          <div style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}>
            {errors.password.message}
          </div>
        )}
      </div>

      <Button loading={loading} type="primary" htmlType="submit" block>
        Login
      </Button>
    </form>
  );
}
