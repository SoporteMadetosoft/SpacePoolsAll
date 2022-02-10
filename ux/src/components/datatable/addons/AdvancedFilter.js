import { Check, Trash } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'reactstrap/lib/Button'
import { startLoadingTable, startLoadingTableFilter } from '../../../redux/actions/custom'
import { handleCleanForm } from '../../../redux/actions/normalForm'
import { Input } from '../../form/Input'
import { MultiSelect } from '../../form/MultiSelect'
import { Textarea } from '../../form/Textarea'

export const AdvancedFilter = ({ title, filters, endPoint }) => {
    const dispatch = useDispatch()
    const { normalForm } = useSelector(state => state)
    return (
        <div className="card">
            <div className="card-header">
                <h1 className="card-title pb-0 px-2">Filtro Avanzado - {title}</h1>
                <div>
                    <Button className='mr-2' onClick={() => {
                        dispatch(handleCleanForm())
                        dispatch(startLoadingTable(endPoint))
                    }}>
                        <Trash size={15} />
                        <span className='align-middle ml-50'>Limpiar Filtros</span>
                    </Button>
                    <Button color='primary' onClick={() => dispatch(startLoadingTableFilter(endPoint, normalForm))}>
                        <Check size={15} />
                        <span className='align-middle ml-50'>Aplicar Filtros</span>
                    </Button>
                </div>
            </div>
            <div className=" card-body row pb-3 px-3">
                {filters.map((e, i) => {
                    const clase = `col-${e.col[1]} col-xs-${e.col[0]} col-md-${e.col[1]} col-lg-${e.col[2]}`
                    const Component = e.endPoint ? MultiSelect : e.area ? Textarea : Input
                    return (
                        <div key={i} className={clase}>
                            <Component {...e} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}