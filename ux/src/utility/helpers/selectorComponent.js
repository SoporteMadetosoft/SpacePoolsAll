import { Input } from '@components/form/Input'
import { Select } from '@components/form/Select'
import { Textarea } from '@components/form/Textarea'
import { MultiSelect } from '@components/form/MultiSelect'
import { InputPassword } from '@components/form/Password'
import { Toggle } from '@components/form/Toggle'
import { SelectBotton } from '@components/form/SelectBotton'

export const SelectorComponent = (e) => {
    if (e.endPoint) {
        if (e.multi) return MultiSelect
        else return Select
    }
    switch (e.type) {
        case 'toggle':
            return Toggle
        case 'password':
            return InputPassword
        case 'area':
            return Textarea
        case 'radiobutton':
            return SelectBotton
        case 'date':
            return Input
        case 'time':
            return Input
        default:
            return Input
    }
}