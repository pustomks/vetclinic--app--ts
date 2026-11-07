export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  username?: string;
}

export type SavedUser = Omit<User, "email" | "phone">;

export type UserContacts = Pick<User, "email" | "phone">;

export type PartialUser = Partial<User>;

export type StrictUser = Required<User>;

export type ReadUser = Readonly<User>;

export interface RegisterFormData {
  username: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface AuthFormData {
  username: string;
  password: string;
}

export interface RegiisterData {
  username: string;
  role: string;
  email: string;
  fullName: string;
}

export interface AuthData {
  accessToken: string;
  tokenType: string;
}

export interface UserRoleResponse {
  role: string;
}

export interface UserFormData {
  email: string;
  fullName: string;
}

export interface UserDataResponse {
  email: string;
  fullName: string;
}

export interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
}

export interface Pet {
  id: number;
  name: string;
  species: PetSpecies;
  breed: string;
  sex: PetSex;
  dateOfBirth: string;
  notes: string;
}
export type PetFormData = Omit<Pet, "id">;

export type PetSpecies = "DOG" | "CAT" | undefined;
export type PetSex = "MALE" | "FEMALE" | undefined;

export type CreatePet = Omit<Pet, "id">;

export interface ApiInfo {
  count: number;
  pages: number;
  page: number;
  size: number;
}

export interface ApiResponse {
  info: ApiInfo;
  results: Pet[];
}

export interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  specialization: string;
  phone: string;
  email: string;
  veterinaryLicense: string;
  bio: string;
  photoUrl: string;
  dateOfBirth: string;
  yearsOfExperience: number;
  hiredOn: string;
  active: boolean;
}

export interface ApiResponseDoctor {
  info: ApiInfo;
  results: Doctor[];
}

export type CreateDoctor = Omit<Doctor, "id">;
