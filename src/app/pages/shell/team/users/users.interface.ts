export interface User {
    id:any;
    name: any;
    reports_to: number;
    role_id: number;
    organization_id:number;
    sub_organization_id:number;
    sub_organization?:string;
    reportTo?:string;
    roleName?:string;
    password?:string;
}

export type UserCreateObj = Omit<User, "id">
export type UserUpdateObj = Omit<User, "password">
