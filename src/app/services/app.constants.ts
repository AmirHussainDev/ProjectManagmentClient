
export const AppPermissions = {
    MainDashboardView: 1,
    SupervisorDashboardView: 2,
    ManageUsers: 3,
    UpdateUsers: 4,
    ManagePermissions: 5,
    AddSites: 6,
    ManageSites: 7,
    AddCustomers: 22,
    ManageSiteContract: 8,
    AddPurchaseRequest: 9,
    PurchaseVerification: 10,
    InventoryUpdates: 11,
    AddEmployees: 12,
    EmployeeAttendance: 13,
    EmployeeSalaryManagment: 14,
    ManagePayments: 15,
    ManageSales: 16,
    AddSales: 17,
    ViewVendors: 18,
    UpdateVendors: 19,
    ViewPermissions: 20,
    UpdatePermissions: 21,
    SwitchOrganization: 23,
    CreateOrganization: 24
}

export const PermissionName = {
    [AppPermissions.MainDashboardView]: "Main Dashboard View",
    [AppPermissions.SupervisorDashboardView]: "Supervisor Dashboard View",
    [AppPermissions.ManageUsers]: "Manage Users",
    [AppPermissions.UpdateUsers]: "Update Users",
    [AppPermissions.AddCustomers]: "Add Customers",
    [AppPermissions.ManagePermissions]: "Manage Permissions",
    [AppPermissions.AddSites]: "Add Sites",
    [AppPermissions.ManageSites]: "Manage Sites",
    [AppPermissions.ManageSiteContract]: "Manage Site Contract",
    [AppPermissions.AddPurchaseRequest]: "Add Purchase Request",
    [AppPermissions.PurchaseVerification]: "Purchase Verification",
    [AppPermissions.InventoryUpdates]: "Inventory Updates",
    [AppPermissions.AddEmployees]: "Labour Agreement Management",
    [AppPermissions.EmployeeAttendance]: "Labour Attendance",
    [AppPermissions.EmployeeSalaryManagment]: "Labour Salary Management",
    [AppPermissions.ManagePayments]: "Manage Payments",
    [AppPermissions.ManageSales]: "Manage Sales",
    [AppPermissions.AddSales]: "Add Sales",
    [AppPermissions.ViewVendors]: "View Vendors",
    [AppPermissions.UpdateVendors]: "Update Vendors",
    [AppPermissions.ViewPermissions]: "View Permissions",
    [AppPermissions.UpdatePermissions]: "Update Permissions",
    [AppPermissions.SwitchOrganization]: "Switch Organization",
    [AppPermissions.CreateOrganization]: "Create Organization",

}

export const DefaultPermissions = {
    [AppPermissions.MainDashboardView]: false,
    [AppPermissions.SupervisorDashboardView]: false,
    [AppPermissions.ManageUsers]: false,
    [AppPermissions.UpdateUsers]: false,
    [AppPermissions.AddCustomers]: false,
    [AppPermissions.ManagePermissions]: false,
    [AppPermissions.AddSites]: false,
    [AppPermissions.ManageSites]: false,
    [AppPermissions.ManageSiteContract]: false,
    [AppPermissions.AddPurchaseRequest]: false,
    [AppPermissions.PurchaseVerification]: false,
    [AppPermissions.InventoryUpdates]: false,
    [AppPermissions.AddEmployees]: false,
    [AppPermissions.EmployeeAttendance]: false,
    [AppPermissions.EmployeeSalaryManagment]: false,
    [AppPermissions.ManagePayments]: false,
    [AppPermissions.ManageSales]: false,
    [AppPermissions.AddSales]: false,
    [AppPermissions.ViewVendors]: false,
    [AppPermissions.UpdateVendors]: false,
    [AppPermissions.ViewPermissions]: false,
    [AppPermissions.UpdatePermissions]: false,
    [AppPermissions.SwitchOrganization]: false,
    [AppPermissions.CreateOrganization]: false,
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
    [SaleStates.Invoiced]: 'INVOICED',
    [SaleStates.Cancelled]: 'CANCELLED'
}

export const ContractStates = {
    Draft: 0,
    PendingApproval: 1,
    Approved: 2,
    Cancelled: 3,
    Completed: 4
}
export const ContractorType = {
    MeasurementBased: "2",
    DurationBased: "1",
}
export const ContractorTypeName = {
    [ContractorType.MeasurementBased]: "Measurement Based",
    [ContractorType.DurationBased]: "Duration Based",
}

export const ContractStateNames = {
    [ContractStates.Draft]: 'DRAFT',
    [ContractStates.PendingApproval]: 'PENDING',
    [ContractStates.Approved]: 'IN-PROGRESS',
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


export const SitesGraphKeys = {
    "siteTotalBudget": "Total Budget",
    "siteExpensesSum": "All Expenses",
    "siteGeneralExpensesSum": "General Expenses",
    "siteContractPaymentsSum": "Contractor Payments",
    "siteOwnerPaymentsSum": "Owner Payments"
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
    Completed: 5
}

export const SiteStateNames = {
    [SiteStates.Draft]: 'DRAFT',
    [SiteStates.PendingApproval]: 'PENDING APPROVAL',
    [SiteStates.Approved]: 'IN-PROGRESS',
    [SiteStates.Cancelled]: 'CANCELLED',
    [SiteStates.Completed]: 'COMPLETED'
}

export const StatusIcons = {
    [ContractStates.Draft]: 'file',
    [ContractStates.PendingApproval]: 'file-sync',
    [ContractStates.Approved]: 'check',
    [ContractStates.Cancelled]: 'close-circle',
    [ContractStates.Completed]: 'file-protect',
    [SaleStates.Draft]: 'file',
    [SaleStates.PaymentConfirmation]: 'dollar',
    [SaleStates.Invoiced]: 'delivered-procedure',
    [SaleStates.Cancelled]: 'close-circle',
    [POStates.Draft]: 'file',
    [POStates.PendingInvoice]: 'file-sync',
    [POStates.PaymentProcessing]: 'dollar',
    [POStates.Cancelled]: 'close-circle',
    [POStates.Completed]: 'file-protect',
    [SiteStates.Draft]: 'file',
    [SiteStates.PendingApproval]: 'file-sync',
    [SiteStates.Approved]: 'check',
    [SiteStates.Cancelled]: 'close-circle',
    [SiteStates.Completed]: 'file-protect'
}
