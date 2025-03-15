export interface IAchievement {
    _id?: string
    title: string;
    description: string;
    deadline?: Date;
    categories: string[];
    awardedBy?: string;
    department: string[];
    attachments?: string[];
    points: number

}