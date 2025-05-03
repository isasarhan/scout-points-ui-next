import { IUser, Rank } from "./user";

export enum Status {
    Pending = 'pending',
    Complete = 'complete',
    Available = 'available',
}

export interface IAddAchievementRequest {
    user: string
    achievement: string
    status?: Status;
}
export interface IAchievementRequest {
    _id?: string
    user: IUser
    achievement: IAchievement
    status?: Status;
}
export interface IAchievement {
    _id?: string
    title: string;
    description: string;
    deadline?: string;
    categories: string[];
    awardedBy?: string;
    departments: string[];
    attachments?: string[];
    points: number
    requirements?: string[]
    level: Level;
    rank?: Rank;
}
export enum Level {
    BEGINNER = "beginner",
    INTERMEDIATE = "intermediate",
    ADVANCED = "advanced",
}