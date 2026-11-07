import { Button, Input, Select, Switch } from "antd";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import type { CreateDoctor, Doctor } from "../../types";

interface DoctorFormProps {
  onSubmit: (data: CreateDoctor) => void;
  loading: boolean;
  initialData?: Doctor | null;
}

function getValues(initialData: Doctor | null | undefined): CreateDoctor {
  if (!initialData) {
    return {
      firstName: "",
      lastName: "",
      specialization: "",
      phone: "",
      email: "",
      veterinaryLicense: "",
      bio: "",
      photoUrl: "",
      dateOfBirth: "",
      yearsOfExperience: 0,
      hiredOn: "",
      active: true,
    };
  }

  const {
    firstName,
    lastName,
    specialization,
    phone,
    email,
    veterinaryLicense,
    bio,
    photoUrl,
    dateOfBirth,
    yearsOfExperience,
    hiredOn,
    active,
  } = initialData;

  return {
    firstName,
    lastName,
    specialization,
    phone,
    email,
    veterinaryLicense,
    bio,
    photoUrl,
    dateOfBirth,
    yearsOfExperience: Number(yearsOfExperience) || 0,
    hiredOn,
    active,
  };
}

const DoctorForm: React.FC<DoctorFormProps> = ({
  onSubmit,
  loading,
  initialData,
}) => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateDoctor>({
    defaultValues: getValues(initialData),
  });

  useEffect(() => {
    reset(getValues(initialData));
  }, [initialData, reset]);

  return (
    <div>
      <form
        style={{
          display: "flex",
          gap: "8px",
          flexDirection: "column",
          width: "100%",
          margin: "0 auto",
          maxWidth: "650px",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Controller
            control={control}
            name="firstName"
            rules={{ required: "Please enter first name!" }}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="enter first name"
                disabled={loading}
                status={errors.firstName ? "error" : ""}
              />
            )}
          />
          {errors.firstName?.message && (
            <div
              style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}
            >
              {errors.firstName.message}
            </div>
          )}
        </div>

        <div>
          <Controller
            control={control}
            name="lastName"
            rules={{ required: "Please enter last name!" }}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="enter last name"
                disabled={loading}
                status={errors.lastName ? "error" : ""}
              />
            )}
          />
          {errors.lastName?.message && (
            <div
              style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}
            >
              {errors.lastName.message}
            </div>
          )}
        </div>

        <div>
          <Controller
            control={control}
            name="specialization"
            rules={{ required: "Please enter specialization!" }}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="enter specialization (e.g. Surgeon, Therapist)"
                disabled={loading}
                status={errors.specialization ? "error" : ""}
              />
            )}
          />
          {errors.specialization?.message && (
            <div
              style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}
            >
              {errors.specialization.message}
            </div>
          )}
        </div>

        <div>
          <Controller
            control={control}
            name="phone"
            rules={{ required: "Please enter phone number!" }}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="enter phone number"
                disabled={loading}
                status={errors.phone ? "error" : ""}
              />
            )}
          />
          {errors.phone?.message && (
            <div
              style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}
            >
              {errors.phone.message}
            </div>
          )}
        </div>

        <div>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Please enter email!",
              pattern: { value: /^\S+@\S+$/, message: "Invalid email format!" },
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                placeholder="enter email address"
                disabled={loading}
                status={errors.email ? "error" : ""}
              />
            )}
          />
          {errors.email?.message && (
            <div
              style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}
            >
              {errors.email.message}
            </div>
          )}
        </div>

        <div>
          <Controller
            control={control}
            name="veterinaryLicense"
            rules={{ required: "Please enter veterinary license!" }}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="enter veterinary license number"
                disabled={loading}
                status={errors.veterinaryLicense ? "error" : ""}
              />
            )}
          />
          {errors.veterinaryLicense?.message && (
            <div
              style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}
            >
              {errors.veterinaryLicense.message}
            </div>
          )}
        </div>

        <div>
          <Controller
            control={control}
            name="photoUrl"
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="enter photo URL (optional)"
                disabled={loading}
              />
            )}
          />
        </div>

        <div>
          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="enter date of birth (YYYY-MM-DD)"
                disabled={loading}
              />
            )}
          />
        </div>

        <div>
          <Controller
            control={control}
            name="hiredOn"
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="enter hired on date (YYYY-MM-DD)"
                disabled={loading}
              />
            )}
          />
        </div>

        <div>
          <Controller
            control={control}
            name="yearsOfExperience"
            render={({ field: { value, onChange, ...field } }) => (
              <Input
                {...field}
                value={value}
                onChange={(e) => onChange(Number(e.target.value) || 0)}
                type="number"
                placeholder="enter years of experience"
                disabled={loading}
              />
            )}
          />
        </div>

        <div>
          <Controller
            control={control}
            name="bio"
            render={({ field }) => (
              <Input.TextArea
                {...field}
                placeholder="enter bio"
                disabled={loading}
                rows={3}
              />
            )}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "4px 0",
          }}
        >
          <span style={{ color: "#595959", fontSize: "14px" }}>
            Active Status:
          </span>
          <Controller
            control={control}
            name="active"
            render={({ field: { value, onChange } }) => (
              <Switch
                checked={value}
                onChange={onChange}
                disabled={loading}
                checkedChildren="Active"
                unCheckedChildren="Inactive"
              />
            )}
          />
        </div>

        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          block
          style={{ marginTop: "8px" }}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default DoctorForm;
