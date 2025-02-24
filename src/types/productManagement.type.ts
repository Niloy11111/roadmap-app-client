export type TProduct = {
  _id: string;
  name: string;
  brand: string;
  category: string;
  quantity: number;
  description: string;
  price: number;
  model: string;
  inStock: boolean;
  photoURL: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TAcademicFaculty = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TAcademicDepartment = {
  _id: string;
  name: string;
  academicFaculty: TAcademicFaculty;
  createdAt: string;
  updatedAt: string;
};
