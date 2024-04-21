import { FormControl, FormArray, FormGroup } from "@angular/forms";

export interface SubOrganization {
    id: number;
    organization_id: number;
    name: string;
    key?: string;
    value?: number;
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
    notes: string;
    item_cost: number;
    amount_paid: number;
    additional_cost: number;
    created_by: number;
    shipment_charges: number;
    total: number;
    balance: number;
    vendor_id: number;
    organization_id: number;
    sub_organization_id: number;
    items: PurchaseItem[],
    subject: string;
    items_discount_total: number;
    overall_discount_total: number;
    overall_discount: number;
    invoice_date: Date;
    due_date: Date;
    sales_person: number;
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

export interface PurchaseOrder {
    id?: number;
    state: number;
    notes: string;
    item_cost: number;
    amount_paid: number;
    isSiteBased: number;
    site_ids: string;
    additional_cost: number;
    created_by: number;
    shipment_charges: number;
    total: number;
    balance: number;
    vendor_id: number;
    organization_id: number;
    sub_organization_id: number;
    items: PurchaseItem[],
    subject: string;
    items_discount_total: number;
    overall_discount_total: number;
    overall_discount: number;
    invoice_date: Date;
    due_date: Date;
    sales_person: number;
    attachment: string;
    terms: string;
}

export interface PurchaseItem {
    id?: number;
    purchase_id?: number;
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
    subject: FormControl;
    items: FormArray<FormGroup<SaleItemControl>>;
    state: FormControl;
    notes: FormControl;
    items_discount_total: FormControl;
    overall_discount_total: FormControl;
    item_cost: FormControl;
    amount_paid: FormControl;
    payment_history: FormArray<FormGroup<PaymentHistory>>;
    additional_cost: FormControl;
    overall_discount: FormControl;
    created_by: FormControl;
    shipment_charges: FormControl;
    total: FormControl;
    balance: FormControl;
    vendor_id: FormControl;
    organization_id: FormControl;
    sub_organization_id: FormControl;
    invoice_date: FormControl;
    due_date: FormControl;
    sales_person: FormControl;
    attachment: FormControl;
    terms: FormControl;
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
    notes: FormControl;
    total: FormControl;
    date_created?: FormControl;
    added_by?: FormControl;
}
export interface SaleItemControl {
    id?: FormControl;
    sale_id?: FormControl;
    name: FormControl;
    selected_item: FormControl,
    vendor_id: FormControl,
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
export interface PurchaseDetails {
    id: FormControl;
    subject: FormControl;
    items: FormArray;
    selectedVendor: FormControl;
    isSiteBased: FormControl;
    site_ids: FormControl;
    state: FormControl;
    notes: FormControl;
    items_discount_total: FormControl;
    overall_discount_total: FormControl;
    item_cost: FormControl;
    amount_paid: FormControl;
    additional_cost: FormControl;
    overall_discount: FormControl;
    created_by: FormControl;
    shipment_charges: FormControl;
    total: FormControl;
    balance: FormControl;
    vendor_id: FormControl;
    organization_id: FormControl;
    sub_organization_id: FormControl;
    invoice_date: FormControl;
    due_date: FormControl;
    sales_person: FormControl;
    attachment: FormControl;
    terms: FormControl;
}
export interface ItemControl {
    id?: FormControl;
    purchase_id?: FormControl;
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
    subject: FormControl;
    contractor: FormControl;
    state: FormControl;
    contract_type: FormControl;
    contract_start_date: FormControl;
    contract_end_date: FormControl;
    with_material: FormControl;
    payment_schedule: FormControl;
    amount_per_schedule: FormControl;
    amount_per_day: FormControl;
    created_by: FormControl;
    total: FormControl;
    organization_id: FormControl;
    sub_organization_id: FormControl;
    site_id: FormControl;
    attachment: FormControl;
    terms: FormControl;
}


export interface SiteDetails {
    id: FormControl;
    name: FormControl;
    budget: FormControl;
    owner: FormControl;
    contact_no: FormControl;
    state: FormControl;
    address: FormControl;
    site_start_date: FormControl;
    site_end_date: FormControl;
    details: FormControl;
    created_by: FormControl;
    total: FormControl;
    organization: FormControl;
    subOrganization: FormControl;
}

export interface Expense {
    id: number;
    name: string;
    is_general: boolean;
    quantity: number;
    amount: number;
    refered_by: number;
    purchase_id?: number;
    is_paid: boolean;
    site: number;
    organization: number;
    subOrganization: number;
    createdBy: number;
}

export interface ExpenseForm {
    id: FormControl;
    name: FormControl;
    is_general: FormControl;
    quantity: FormControl;
    amount: FormControl;
    refered_by: FormControl;
    purchase_id?: FormControl;
    is_paid: FormControl;
    site: FormControl;
    organization: FormControl;
    subOrganization: FormControl;
    createdBy: FormControl;
}