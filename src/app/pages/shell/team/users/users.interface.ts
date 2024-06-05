export interface User {
    is_contractor: any;
    is_employee: any;
    email: any;
    contact_no: any;
    address: any;
    is_admin: any;
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
    role:any;
}

export type UserCreateObj = Omit<User, "id">
export type UserUpdateObj = Omit<User, "password">
