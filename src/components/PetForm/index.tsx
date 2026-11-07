import { Button, Input, Select } from "antd";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import type { CreatePet, Pet, PetFormData } from "../../types";

interface PetFormProps {
  onSubmit: (data: CreatePet) => void;
  loading: boolean;
  initialData?: Pet | null;
}

function getValues(initialData: Pet | null | undefined): PetFormData {
  if (!initialData) {
    return {
      name: "",
      species: undefined,
      breed: "",
      sex: undefined,
      dateOfBirth: "",
      notes: "",
    };
  }

  const { name, species, breed, sex, dateOfBirth, notes } = initialData;
  return { name, species, breed, sex, dateOfBirth, notes };
}

const PetForm: React.FC<PetFormProps> = ({
  onSubmit,
  loading,
  initialData,
}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreatePet>({
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
          gap: "5px",
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
            name="name"
            rules={{ required: "Please enter pet name!" }}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="enter name"
                disabled={loading}
                status={errors.name ? "error" : ""}
              />
            )}
          />
          {errors.name?.message && (
            <div
              style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}
            >
              {errors.name.message}
            </div>
          )}
        </div>

        <div>
          <Controller
            control={control}
            name="species"
            rules={{ required: "Please select species!" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="enter species"
                disabled={loading}
                status={errors.species ? "error" : ""}
                style={{ width: "100%", textAlign: "left" }}
                options={[
                  { value: "DOG", label: "Dog" },
                  { value: "CAT", label: "Cat" },
                ]}
              />
            )}
          />
          {errors.species?.message && (
            <div
              style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}
            >
              {errors.species.message}
            </div>
          )}
        </div>

        <div>
          <Controller
            control={control}
            name="breed"
            rules={{ required: "Please enter breed!" }}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="enter breed"
                disabled={loading}
                status={errors.breed ? "error" : ""}
              />
            )}
          />
          {errors.breed?.message && (
            <div
              style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}
            >
              {errors.breed.message}
            </div>
          )}
        </div>

        <div>
          <Controller
            control={control}
            name="sex"
            rules={{ required: "Please select sex!" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="enter sex"
                disabled={loading}
                status={errors.sex ? "error" : ""}
                style={{ width: "100%", textAlign: "left" }}
                options={[
                  { value: "MALE", label: "Male" },
                  { value: "FEMALE", label: "Female" },
                ]}
              />
            )}
          />
          {errors.sex?.message && (
            <div
              style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}
            >
              {errors.sex.message}
            </div>
          )}
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
            name="notes"
            rules={{ required: "Please enter notes!" }}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="enter notes"
                disabled={loading}
                status={errors.notes ? "error" : ""}
              />
            )}
          />
          {errors.notes?.message && (
            <div
              style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}
            >
              {errors.notes.message}
            </div>
          )}
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

export default PetForm;
