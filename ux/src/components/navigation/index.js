// ** Navigation sections imports
import headerMenu from './headerMenu'
import headerAdmin from './headerAdmin'

import customers from './customers/settings'
import vendors from './vendors/settings'
// import carriers from './carriers/settings'
// import trailer from './trailer/settings'
import vehicles from './vehicles/settings'
import pool from './pool/settings'
import purchases from './purchases/settings'
import items from './items/settings'
import orders from './orders/settings'
import productions from './production/settings'

import administrator from './administrator/settings'

// ** Merge & Export

export default [
    ...headerMenu, 
    ...customers,
    ...vendors,
    ...vehicles, 
    ...pool, 
    ...items, 
    ...purchases, 
    ...orders, 
    ...productions,
    ...headerAdmin,
    ...administrator
]
