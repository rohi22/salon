export interface Department {
    id: number,
    departmentName: string;
    createdAt: Date;
    modifiedAt: Date;
    createdBy: number;
    modifiedBy: number;
    active: boolean;
}