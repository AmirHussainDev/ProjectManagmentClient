export interface Customer {
    loading?: boolean;
    expand: boolean;
    id:any;
    name: any;
    contact_no: number;
    address: string;
    account_no:number;
    details?:any[];
}

export type CustomerCreateObj = Omit<Customer, "id">
