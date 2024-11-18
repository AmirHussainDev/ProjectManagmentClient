import { FormControl, FormArray, FormGroup } from "@angular/forms";
import { User } from "../pages/shell/team/users/users.interface";

export interface Client {
    id: number;
    organization_id: number;
    name: string;
    contact: string;
    projectDescription: string;
    projectDuration: number;
    projectBudget: number;
    key?: string;
    value?: number;
    filename?: string;
    owner?: User;
    currency?: string;
}
export interface Organization {
    id: number;
    name: string;
    domain_name:string;
    icon:string;
    image:string;
    key?: string;
}

export interface Role {
    id: number;
    role_name: string;
    organization_id: string;
    role_permissions: any;
}

export interface Site {
    id: number;
    name: string;
    organization_id: string;
    site_supervisors?: string;
}

export type RoleCreateObj = Omit<Role, "id">


export interface RoleObj {
    key: any;
    value: any;
    role_name?: string;
    id?: number;
}


export interface SaleOrder {
    id?: number;
    state: number;
    description: string;
    item_cost: number;
    amount_paid: number;
    additional_cost: number;
    created_by: number;
    shipment_charges: number;
    total: number;
    balance: number;
    project_id: number;
    organization_id: number;
    client_id: number;
    items: TaskItem[],
    title: string;
    items_discount_total: number;
    overall_discount_total: number;
    overall_discount: number;
    invoice_date: Date;
    due_date: Date;
    customer: number;
    new_customer: boolean;
    attachment: string;
    terms: string;
}

export interface SaleItem {
    id?: number;
    sale_id?: number;
    name: string;
    qty: number;
    unit_price: number;
    discount: number;
    total: number;
    date_created?: Date;
    isCustom?: boolean;
    returned_now: boolean;
}

export interface TaskOrder {
    id?: number;
    state: number;
    type:number;
    description:string;
    created_by: number;
    organization_id: number;
    client_id: number;
    title: string;
    due_date: Date;
    assignee: number;
    comments: string;
    terms: string;
}

export interface TaskItem {
    id?: number;
    task_id?: number;
    name: string;
    qty: number;
    unit_price: number;
    discount: number;
    total: number;
    date_created?: Date;
    isCustom?: boolean;
}

export interface SaleDetails {
    id: FormControl;
    title: FormControl;
    items: FormArray<FormGroup<SaleItemControl>>;
    state: FormControl;
    description: FormControl;
    items_discount_total: FormControl;
    overall_discount_total: FormControl;
    item_cost: FormControl;
    amount_paid: FormControl;
    payment_history: FormArray<FormGroup<PaymentHistory>>;
    additional_cost: FormControl;
    overall_discount: FormControl;
    created_by: FormControl;
    date_created: FormControl;
    shipment_charges: FormControl;
    total: FormControl;
    balance: FormControl;
    organization_id: FormControl;
    client_id: FormControl;
    invoice_date: FormControl;
    due_date: FormControl;
    customer: FormControl;
    attachment: FormControl;
    terms: FormControl;
    new_customer:FormControl;
    sale_no: FormControl,
}
export interface SaleItemReturnControl {
    reason?: FormControl;
    qty: FormControl;
    unit_price: FormControl;
    max_qty: FormControl;
    charge: FormControl;
    returnAmount: FormControl;
    date_created?: FormControl;
}
export interface PaymentHistory {
    description: FormControl;
    total: FormControl;
    date_created?: FormControl;
    added_by?: FormControl;
}
export interface SaleItemControl {
    id?: FormControl;
    sale_id?: FormControl;
    name: FormControl;
    selected_item: FormControl,
    project: FormControl,
    qty: FormControl;
    actualQty: FormControl;
    unit_price: FormControl;
    max_qty: FormControl;
    min_unit_price: FormControl;
    discount: FormControl;
    total: FormControl;
    date_created?: FormControl;
    return_details: FormArray;
    isCustom?: FormControl;
    returned_now?: FormControl;
}
export interface TaskDetails {
    severity: FormControl;
    id: FormControl;
    title: FormControl;
    description:FormControl;
    state: FormControl;
    type:FormControl;
    created_by: FormControl;
    date_created: FormControl;
    organization_id: FormControl;
    client_id: FormControl;
    start_date:FormControl;
    due_date: FormControl;
    assignee: FormControl;
    comments: FormControl;
    task_no:FormControl;
    terms: FormControl;
}
export interface ItemControl {
    id?: FormControl;
    task_id?: FormControl;
    name: FormControl;
    qty: FormControl;
    unit_price: FormControl;
    discount: FormControl;
    total: FormControl;
    date_created?: FormControl;
    isCustom?: FormControl;
}

export interface ContractDetails {
    id: FormControl;
    title: FormControl;
    details:FormControl;
    contractor: FormControl;
    state: FormControl;
    contract_type: FormControl;
    contract_start_date: FormControl;
    contract_end_date: FormControl;
    with_material: FormControl;
    amount_per_unit: FormControl;
    created_by: FormControl;
    total: FormControl;
    organization: FormControl;
    client: FormControl;
    site: FormControl;
    attachment: FormControl;
    terms: FormControl;
    no_of_hours:FormControl;
    include_weekends:FormControl;
}


export interface SiteDetails {
    id: FormControl;
    name: FormControl;
    budget: FormControl;
    owner: FormControl;
    contact_no: FormControl;
    site_supervisors: FormControl;

    state: FormControl;
    address: FormControl;
    site_start_date: FormControl;
    site_end_date: FormControl;
    details: FormControl;
    created_by: FormControl;
    total: FormControl;
    organization: FormControl;
    client: FormControl;
}

export interface Expense {
    id: number;
    name: string;
    is_general: boolean;
    quantity: number;
    amount: number;
    refered_by: number;
    task_id?: number;
    is_paid: boolean;
    site: number;
    organization: number;
    client: number;
    created_by?: number;
    note: string;
    unit_price?: number;
}

export interface ExpenseForm {
    id?: FormControl;
    name: FormControl;
    is_general: FormControl;
    quantity: FormControl;
    amount: FormControl;
    refered_by: FormControl;
    task_id?: FormControl;
    is_paid: FormControl;
    site: FormControl;
    organization?: FormControl;
    client?: FormControl;
    createdBy?: FormControl;
    note: FormControl;
    unit_price: FormControl;

}

export interface OwnerPayment {
    id: number;
    name: string;
    amount: number;
    is_paid: boolean;
    site: number;
    organization: number;
    client: number;
    created_by?: number;
    note: string;
}

export interface OwnerPaymentForm {
    id?: FormControl;
    name: FormControl;
    amount: FormControl;
    is_paid: FormControl;
    site: FormControl;
    organization?: FormControl;
    client?: FormControl;
    created_by?: FormControl;
    note: FormControl;
}


export interface ContractPayment {
    id: number;
    contractor: number;
    amount: number;
    title: string;
}
export interface ContractorWorkLogForm {
    id?: FormControl;
    amount: FormControl;
    note: FormControl;
    work_from: FormControl;
    work_to: FormControl;
    no_of_hours: FormControl;
    contract: FormControl;
    site: FormControl;
    organization?: FormControl;
    client?: FormControl;
    created_by?: FormControl;
}
export interface ContractorWorkLog {
    id: number;
    contractor: number;
    amount: number;
    note: string;
    work_from: Date;
    work_to: Date;
    no_of_hours: Date;
    site: number;
    created_by: any;
    date_created: Date;
}

export interface ContractorPaymentForm {
    id?: FormControl;
    amount: FormControl;
    note: FormControl;
    contract: FormControl;
    site: FormControl;
    organization?: FormControl;
    client?: FormControl;
    created_by?: FormControl;
}
export interface ContractorPayment {
    id: number;
    contractor: number;
    amount: number;
    note: string;
    site: number;
    contract: number;
}


export interface EmployeeForm {
    id: FormControl;
    organization: FormControl;
    client: FormControl;
    position: FormControl;
    employee: FormControl;
    // supervisor: FormControl;
    // isHourlyRateHourly: FormControl;
    salary: FormControl;
    // overtime: FormControl;
    // siginout_required: FormControl;
    details: FormControl;
    // workingHours:FormControl;
}


export interface Employee {
    id: number;
    organization: number;
    client: number;
    position: string;
    employee: any;
    salary: number;
    // workingHours:number;
    // isHourlyRateHourly:boolean;
    // overtime: boolean;
    // siginout_required: boolean;
    details: string;
    date_created:Date;
}

export interface Worklog {
    id: number;
    employee: number;
    sign_in: Date;
    sign_out: Date;
    sign_in_corrd?: string;
    sign_out_corrd?: string;
    hours_worked: number;
    approved_hours: number;
    amount: number;
    created_by: number;
    date_created: Date;
    worklog_date:Date;
    paid:boolean;
}

export interface EmployeePayments {
    id: number;
    payment_type: string;

    employee: Employee;

    amount: number;

    balance: number;

    payment_description: string;

    created_by: User;

    date_created: Date;

}