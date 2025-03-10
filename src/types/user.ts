
interface Address {
    street: string;
    building: string;
    floor: string;
    country: string;
    city: string;
}

export interface IUser {
    _id?:string
    firstName: string;
    lastName: string;
    fatherName: string;
    motherName?: string;
    email: string;
    password: string;
    phone: string;
    address?: Address;
    nationality?: string;
    points?: number;
    profileUrl?: number;
    department?: string;
    role?: Role
}

export enum Role {
    ADMIN = 'admin',
    USER = 'user',
    MANAGER = 'manager',
    MODERATOR = 'moderator',
}
