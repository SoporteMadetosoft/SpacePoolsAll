// ** Vertical Menu Components
import VerticalNavMenuLink from './VerticalNavMenuLink'
import VerticalNavMenuGroup from './VerticalNavMenuGroup'
import VerticalNavMenuSectionHeader from './VerticalNavMenuSectionHeader'

// ** Utils
import {
  resolveVerticalNavMenuItemComponent as resolveNavItemComponent,
  canViewMenuGroup,
  canViewMenuItem,
  canViewMenuHeader
} from '@layouts/utils'

const VerticalMenuNavItems = props => {

  // ** Components Object
  const Components = {
    VerticalNavMenuSectionHeader,
    VerticalNavMenuGroup,
    VerticalNavMenuLink
  }
  console.log(props.items)

  // ** Render Nav Menu Items
  const RenderNavItems = props.items.map((item, index) => {
    const TagName = Components[resolveNavItemComponent(item)]
    if (item.header) {
      return canViewMenuHeader(item) && <TagName key={item.header} item={item} {...props} />
    } else if (item.children) {
      return canViewMenuGroup(item) && <TagName item={item} index={index} key={item.id} {...props} />
    }
    return canViewMenuItem(item) && <TagName key={item.id} item={item} {...props} />
  })

  return RenderNavItems
}

export default VerticalMenuNavItems
