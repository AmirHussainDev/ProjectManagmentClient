export interface Customer {
    id:any;
    name: any;
    contact_no: number;
    address: number;
    account_no:number;
}

export type CustomerCreateObj = Omit<Customer, "id">
