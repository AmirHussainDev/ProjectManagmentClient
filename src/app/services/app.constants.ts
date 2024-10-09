
export const AppPermissions = {
    MainDashboardView: 1,
    SupervisorDashboardView: 2,
    ManageUsers: 3,
    UpdateUsers: 4,
    ManagePermissions: 5,
    AddProjects: 6,
    ManageProjects: 7,
    AddCustomers: 22,
    ManageSiteContract: 8,
    AddTaskRequest: 9,
    TaskVerification: 10,
    InventoryUpdates: 11,
    AddEmployees: 12,
    EmployeeWorklog: 13,
    EmployeeHourlyRateManagment: 14,
    ManagePayments: 15,
    ManageTasks: 16,
    AddTasks: 17,
    ViewProjects: 18,
    UpdateProjects: 19,
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
    [AppPermissions.AddProjects]: "Add Project",
    [AppPermissions.ManageProjects]: "Manage Projects",
    [AppPermissions.ManageSiteContract]: "Manage Site Contract",
    [AppPermissions.AddTaskRequest]: "Add Task Request",
    [AppPermissions.TaskVerification]: "Task Verification",
    [AppPermissions.InventoryUpdates]: "Inventory Updates",
    [AppPermissions.AddEmployees]: "Employee Agreement Management",
    [AppPermissions.EmployeeWorklog]: "Employee Worklog",
    [AppPermissions.EmployeeHourlyRateManagment]: "Employee HourlyRate Management",
    [AppPermissions.ManagePayments]: "Manage Payments",
    [AppPermissions.ManageTasks]: "Manage Tasks",
    [AppPermissions.AddTasks]: "Add Tasks",
    [AppPermissions.ViewProjects]: "View Projects",
    [AppPermissions.UpdateProjects]: "Update Projects",
    [AppPermissions.ViewPermissions]: "View Permissions",
    [AppPermissions.UpdatePermissions]: "Update Permissions",
    [AppPermissions.SwitchOrganization]: "Switch Client",
    [AppPermissions.CreateOrganization]: "Create Client",

}

export const DefaultPermissions = {
    [AppPermissions.MainDashboardView]: false,
    [AppPermissions.SupervisorDashboardView]: false,
    [AppPermissions.ManageUsers]: false,
    [AppPermissions.UpdateUsers]: false,
    [AppPermissions.AddCustomers]: false,
    [AppPermissions.ManagePermissions]: false,
    [AppPermissions.AddProjects]: false,
    [AppPermissions.ManageProjects]: false,
    [AppPermissions.ManageSiteContract]: false,
    [AppPermissions.AddTaskRequest]: false,
    [AppPermissions.TaskVerification]: false,
    [AppPermissions.InventoryUpdates]: false,
    [AppPermissions.AddEmployees]: false,
    [AppPermissions.EmployeeWorklog]: false,
    [AppPermissions.EmployeeHourlyRateManagment]: false,
    [AppPermissions.ManagePayments]: false,
    [AppPermissions.ManageTasks]: false,
    [AppPermissions.AddTasks]: false,
    [AppPermissions.ViewProjects]: false,
    [AppPermissions.UpdateProjects]: false,
    [AppPermissions.ViewPermissions]: false,
    [AppPermissions.UpdatePermissions]: false,
    [AppPermissions.SwitchOrganization]: false,
    [AppPermissions.CreateOrganization]: false,
}

export const SaleStates = {
    Draft: -1,
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
    Draft: -1,
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
export const TaskStates= {
    Backlog: -1,
    Todo: 1,
    InProgress:2,
    InTesting: 3,
    Completed: 4,
    Cancelled: 5
}

export const TaskColors= {
    [TaskStates.Backlog]: '#d0cfcf17',
    [TaskStates.Todo]: '#B2C6B6',
    [TaskStates.InProgress]: '#A1BE95',
    [TaskStates.InTesting]: '#735DA5',
    [TaskStates.Completed]: '#66A5AC',
    [TaskStates.Cancelled]: '#FB6543',
}
export const TaskCardColors= {
    [TaskStates.Backlog]: '#d0cfcf17',
    [TaskStates.Todo]: '#B2C6B6',
    [TaskStates.InProgress]: 'rgb(161 190 149 / 18%)',
    [TaskStates.InTesting]: 'rgb(115 93 165 / 24%)',
    [TaskStates.Completed]: 'rgb(102 165 172 / 19%)',
    [TaskStates.Cancelled]: 'rgb(251 101 67 / 19%)',
    
}



export const ProjectsGraphKeys = {
    "siteTotalBudget": "Total Budget",
    "siteExpensesSum": "All Expenses",
    "siteGeneralExpensesSum": "General Expenses",
    "siteContractPaymentsSum": "Contractor Payments",
    "siteOwnerPaymentsSum": "Owner Payments"
}

export const TaskStateNames :any= {
    [TaskStates.Backlog]: 'Backlog',
    [TaskStates.Todo]: 'Todo',
    [TaskStates.InProgress]: 'In Progress',
    [TaskStates.InTesting]: 'In Testing',
    [TaskStates.Completed]: 'Completed',
    [TaskStates.Cancelled]: 'Cancelled',
}

export const SiteStates = {
    Draft: -1,
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
    [TaskStates.Backlog]: 'file',
    [TaskStates.Todo]: 'file-sync',
    [TaskStates.InProgress]: 'file-sync',
    [TaskStates.InTesting]: 'dollar',
    [TaskStates.Completed]: 'file-protect',
    [SiteStates.Draft]: 'file',
    [SiteStates.PendingApproval]: 'file-sync',
    [SiteStates.Approved]: 'check',
    [SiteStates.Cancelled]: 'close-circle',
    [SiteStates.Completed]: 'file-protect'
}

export const RestrictNavigationMessage="Are you sure you want to navigate away? Any unsaved changes may be lost."

export const TaskTypes: { [key: number]: string }={1:'Bug',2:'Story'}
export const TaskTypeColors: { [key: number]: string } = { 1: 'red', 2: 'blue' };
export const TaskSeverity: { [key: number]: string }={1:'Medium',2:'Low',3:'Critical',4:'High'}
export const TaskSeverityColors: { [key: number]: string } = { 1: 'blue', 2: 'green',3:'red',4:'orange' };

export const TaskStatesConnectivity = {
    [TaskStates.Backlog]: ['Todo','Cancelled'],
    [TaskStates.Todo]: ['Backlog','InProgress','Cancelled'],
    [TaskStates.InProgress]: ['Todo','InTesting'],
    [TaskStates.InTesting]: ['InProgress','Completed'],
    [TaskStates.Completed]: [],
    [TaskStates.Cancelled]: ['Backlog']
}