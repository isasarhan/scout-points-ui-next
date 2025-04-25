export interface IAssociation{
    _id?:string
    name: string;
    type: EnumAssociationType;
    description?: string;
    website?: string;
}
export enum EnumAssociationType {
    SCOUT = 'scout',
    UNIVERSITY = 'university',
    NEIGHBORHOOD = 'neighborhood'
}