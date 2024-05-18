
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
    Quote: 1,
    PaymentConfirmation: 2,
    Cancelled: 3,
    Invoiced: 4
}

export const SaleStateNames = {
    [SaleStates.Draft]: 'DRAFT',
    [SaleStates.PaymentConfirmation]: 'PAYMENT CONFIRMATION',
    [SaleStates.Invoiced]: 'Invoiced',
    [SaleStates.Cancelled]: 'CANCELLED'
}

export const ContractStates = {
    Draft: 0,
    PendingApproval: 1,
    Approved: 2,
    Cancelled: 3,
    Completed: 4
}

export const ContractStateNames = {
    [ContractStates.Draft]: 'DRAFT',
    [ContractStates.PendingApproval]: 'PENDING INVOICE',
    [ContractStates.Approved]: 'APPROVED',
    [ContractStates.Cancelled]: 'CANCELLED',
    [ContractStates.Completed]: 'COMPLETED'
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

export const SiteStates = {
    Draft: 0,
    PendingApproval: 1,
    Approved: 4,
    Cancelled: 3,
    Completed: 4
}

export const SiteStateNames = {
    [SiteStates.Draft]: 'DRAFT',
    [SiteStates.PendingApproval]: 'PENDING APPROVAL',
    [SiteStates.Approved]: 'APPROVED',
    [SiteStates.Cancelled]: 'CANCELLED',
    [SiteStates.Completed]: 'COMPLETED'
}