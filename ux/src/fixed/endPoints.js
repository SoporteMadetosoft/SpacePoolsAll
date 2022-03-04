const setupEndpoints = {
    AddressType: '/setup/general/address-type',
    Department: '/setup/general/department',
    SalesOrg: '/setup/centers/sales-org',
    ConditionalOrg: '/setup/centers/conditional-org',
    DepositOrg: '/setup/centers/deposit-org',
    Zone: '/setup/centers/zone',
    ProcedureFamily: '/setup/procedures/procedure-family',
    Family: '/setup/items/family',
    IncidenceType: '/setup/incidences/incidence-type',
    IncidenceReason: '/setup/incidences/incidence-reason',
    LoanType: '/setup/loans/loan-type',
    Brand: '/setup/vehicles/brand',
    Model: '/setup/vehicles/model'
}

export const endPoints = {
    Mutuas: '/mutua',
    Centers: '/center',
    Doctors: '/doctor',
    Procedures: '/procedure',
    Surgery: '/surgery',
    Notification: '/notification',
    Alerts: '/alerts',
    Vehicles: '/vehicle',
    Calendar: '/calendar',
    Routes: '/route',
    Users: '/user',
    Roles: '/role',
    Logs: '/logs',
    ...setupEndpoints
}