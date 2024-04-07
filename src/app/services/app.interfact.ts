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

export const AppPermissions = {
    UpdatePermissions: 1,
    AddPurchaseRequest: 2,
    PurchaseVerification: 3,
    ContractManagment: 4,
    InventoryUpdates: 5,
    LabourAgreementManagment: 6,
    LabourAttendance: 7,
    LabourSalaryManagment: 8,
    MainDashboardView: 9,
    SupervisorDashboardView: 10,
    AddSites: 11,
    ManageUsers: 12
}


export const PermissionName = {
    [AppPermissions.AddSites]: "Add Sites",
    [AppPermissions.ManageUsers]: "Manage Users",
    [AppPermissions.UpdatePermissions]: "Update Permissions",
    [AppPermissions.AddPurchaseRequest]: "Add Purchase Request",
    [AppPermissions.PurchaseVerification]: "Purchase Verification",
    [AppPermissions.ContractManagment]: "Contract Managment",
    [AppPermissions.InventoryUpdates]: "Inventory Updates",
    [AppPermissions.LabourAgreementManagment]: "Labour Agreement Managment",
    [AppPermissions.LabourAttendance]: "Labour Attendance",
    [AppPermissions.LabourSalaryManagment]: "Labour Salary Managment",
    [AppPermissions.MainDashboardView]: "Main Dashboard View",
    [AppPermissions.SupervisorDashboardView]: "Supervisor Dashboard View",
}



export const DefaultPermissions = {
    [AppPermissions.AddSites]: false,
    [AppPermissions.ManageUsers]: false,
    [AppPermissions.UpdatePermissions]: false,
    [AppPermissions.AddPurchaseRequest]: false,
    [AppPermissions.PurchaseVerification]: false,
    [AppPermissions.ContractManagment]: false,
    [AppPermissions.InventoryUpdates]: false,
    [AppPermissions.LabourAgreementManagment]: false,
    [AppPermissions.LabourAttendance]: false,
    [AppPermissions.LabourSalaryManagment]: false,
    [AppPermissions.MainDashboardView]: false,
    [AppPermissions.SupervisorDashboardView]: false,
}


export const SaleStates = {
    Draft: 0,
    PaymentConfirmation: 2,
    Cancelled: 3,
    Completed: 4
}

export const SaleStateNames = {
    [SaleStates.Draft]: 'DRAFT',
    [SaleStates.PaymentConfirmation]: 'PAYMENT CONFIRMATION',
    [SaleStates.Cancelled]: 'CANCELLED',
    [SaleStates.Completed]: 'COMPLETED'
}

export const POStates = {
    Draft: 0,
    PendingInvoice: 1,
    PaymentProcessing: 2,
    Cancelled: 3,
    Completed: 4
}

export const InvoiceStateNames = {
    [POStates.Draft]: 'DRAFT',
    [POStates.PendingInvoice]: 'PENDING INVOICE',
    [POStates.PaymentProcessing]: 'PAYMENT PROCESSING',
    [POStates.Cancelled]: 'CANCELLED',
    [POStates.Completed]: 'COMPLETED'
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