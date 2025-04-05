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
}
export enum Level {
    BEGINNER = "beginner",
    INTERMEDIATE = "intermediate",
    ADVANCED = "advanced",
}