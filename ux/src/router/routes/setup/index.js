// ** Routes Imports
import customerRoutes from "./customers/customerRoutes"
import generalRoutes from "./general/generalRoutes"
import itemRoutes from "./items/itemRoutes"
import vehicleRoutes from "./vehicles/vehicleRoutes"
import vendorRoutes from "./vendors/vendorRoutes"

// ** Merge Routes
const Routes = [
  ...customerRoutes,
  ...itemRoutes,
  ...vehicleRoutes,
  ...vendorRoutes,
  ...generalRoutes
]

export const setupRoutes = () => {
  return Routes
}
