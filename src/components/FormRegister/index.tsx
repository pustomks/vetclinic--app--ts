import React, { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import type { RegiisterData, RegisterFormData } from "../../types";
import { App, Button, Input } from "antd";
import api from "../../api/axios";
import styles from "./FormRegister.module.css";

interface FormRegisterProps {
  onChange: (key: string) => void;
}

const FormRegister: React.FC<FormRegisterProps> = ({ onChange }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { message } = App.useApp();
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      username: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    const { confirmPassword, ...payload } = data;
    setLoading(true);
    try {
      const response = await api.post<RegiisterData>(
        "/api/auth/register",
        payload,
      );
      console.log(response.data);
      message.success("Registration successful! You can now log in.");
      onChange("auth");
      reset();
    } catch (error: any) {
      console.log(error);
      message.error(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.inputRegister}>
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
          name="fullName"
          rules={{ required: "Please enter full name!" }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Enter full name"
              disabled={loading}
              status={errors.fullName ? "error" : ""}
            />
          )}
        />
        {errors.fullName?.message && (
          <div style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}>
            {errors.fullName.message}
          </div>
        )}
      </div>

      <div className={styles.formInput}>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Please enter email!",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Enter email"
              disabled={loading}
              status={errors.email ? "error" : ""}
            />
          )}
        />
        {errors.email?.message && (
          <div style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}>
            {errors.email.message}
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

      <div className={styles.formInput}>
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: "Please confirm your password!",
            validate: (value) =>
              value === watch("password") || "Passwords do not match!",
          }}
          render={({ field }) => (
            <Input.Password
              {...field}
              placeholder="Enter confirmPassword"
              disabled={loading}
              status={errors.confirmPassword ? "error" : ""}
            />
          )}
        />
        {errors.confirmPassword?.message && (
          <div style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}>
            {errors.confirmPassword.message}
          </div>
        )}
      </div>

      <Button loading={loading} type="primary" htmlType="submit" block>
        Register
      </Button>
    </form>
  );
};

export default FormRegister;
