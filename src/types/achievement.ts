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
}