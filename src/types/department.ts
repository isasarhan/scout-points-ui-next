export enum EnumDepartmentType {
  SCOUT = 'scout',
  UNIVERSITY = 'university',
  NEIGHBORHOOD = 'neighborhood'
}
export enum EnumDepartmentStatus {
  ACTIVE = "active",
  ARCHIVED = "archived",
}
export interface ILocation {
  city: string;
  country: string;
  postalCode: string;
  street: string;
}

export interface IDepartment {
  _id: string;
  name: string;
  location: ILocation;
  type: EnumDepartmentType;
  status: EnumDepartmentStatus;
  description: string;
  manager?: string;
}
