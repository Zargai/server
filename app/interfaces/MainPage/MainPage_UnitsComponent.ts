export interface IUnit {
    _id: string;
    id?: string;
    title?: string;
    image?: string;
    description?: string;
}

export interface IUnitInput {
    id?: string;
    title?: string;
    image?: string;
    description?: string;
}