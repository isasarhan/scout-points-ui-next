import { IDepartment } from "./department";

interface Address {
    street: string;
    building: string;
    floor: string;
    country: string;
    city: string;
}

export interface IAddUser {
    _id?: string
    firstName: string;
    lastName: string;
    fatherName: string;
    motherName?: string;
    email: string;
    password: string;
    phone?: string;
    address?: Address;
    nationality?: string;
    points?: number;
    isApproved?: boolean;
    profileUrl?: string;
    department?: string
    isSuperAdmin?: boolean;
    role?: Role
}
export interface IAddUser {
    firstName: string;
    lastName: string;
    fatherName: string;
    motherName?: string;
    email: string;
    password: string;
    phone?: string;
    address?: Address;
    isApproved?: boolean;
    nationality?: string;
    points?: number;
    profileUrl?: string;
    department?: string
    role?: Role
    rank?: Rank
}
export interface IUser {
    _id?: string
    firstName: string;
    lastName: string;
    fatherName: string;
    motherName?: string;
    email: string;
    password: string;
    phone?: string;
    address?: Address;
    isApproved?: boolean;
    nationality?: string;
    points?: number;
    profileUrl?: string;
    department?: Partial<IDepartment>
    role?: Role
    rank?: Rank

}

export enum Role {
    ADMIN = 'admin',
    USER = 'user',
    MANAGER = 'manager',
    MODERATOR = 'moderator',
}

export enum Rank {
    LEADER = 'leader',
    ROVER = 'rover',
    ADVANCED_SCOUT = 'advanced scout',
    SCOUT = 'scout',
    CUB = 'cub',
}
