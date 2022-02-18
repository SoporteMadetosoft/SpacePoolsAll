// ** Routes Imports
import SalesOrgRoutes from "./salesOrg"
import ConditionalOrgRoutes from "./conditionalOrg"
import DepositOrgRoutes from "./depositOrg"
import ProcedureFamilyRoutes from "./procedureFamily"
import FamilyReoutes from "./family"
import IncidenceTypeRoutes from "./incidenceType"
import IncidenceReasonRoutes from "./incidenceReason"
import LoanTypeRoutes from "./loanType"
import BrandRoutes from "./brand"
import ModelRoutes from "./model"
import AddressTypeRoutes from "./addressType"
import DepartmentRoutes from "./department"

// ** Merge Routes
const setupRoutes = [
    ...SalesOrgRoutes,
    ...ConditionalOrgRoutes,
    ...DepositOrgRoutes,
    ...ProcedureFamilyRoutes,
    ...FamilyReoutes,
    ...IncidenceTypeRoutes,
    ...IncidenceReasonRoutes,
    ...LoanTypeRoutes,
    ...BrandRoutes,
    ...ModelRoutes,
    ...AddressTypeRoutes,
    ...DepartmentRoutes
]

export default setupRoutes
